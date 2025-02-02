use std::sync::Arc;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use axum_extra::extract::{cookie::Cookie, CookieJar};
use cookie::{time::Duration, SameSite};
use eloquent::Eloquent;
use jiff::ToSpan;
use jsonwebtoken::{encode, Algorithm, Header};
use serde::{Deserialize, Serialize};
use ulid::Ulid;

use crate::{
    environment_variables::{API_HOST, API_PROTOCOL},
    error::Error,
    extract::json::Json,
    services::jwt::{
        AccessTokenClaims, RefreshTokenClaims, Role, ENCODING_KEY, JWT_ISSUER,
        REFRESH_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_PATH, REFRESH_TOKEN_EXPIRATION_DURATION,
    },
    state::SharedState,
};

#[derive(Debug, Deserialize)]
pub struct SigninRequestBody {
    email: String,
    password: String,
}

#[derive(Debug, Serialize)]
pub struct SigninResponse {
    access_token: String,
}

impl SigninResponse {
    pub fn new(access_token: String) -> Self {
        Self { access_token }
    }
}

impl Default for SigninResponse {
    fn default() -> Self {
        Self {
            access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3Mzg1MjQxMTMsImV4cCI6MTc3MDA2MDExMywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSJ9.qkEB5Cms_EhJ-QaGfMvE5vG-X5W99OKpnMPNtxiItns".to_string(),
        }
    }
}

pub async fn handler(
    State(state): State<Arc<SharedState>>,
    jar: CookieJar,
    Json(body): Json<SigninRequestBody>,
) -> Result<Response, Error> {
    let account_query = Eloquent::query()
        .table("accounts")
        .select(vec!["id", "username", "email", "password", "role"])
        .r#where("email", body.email)
        .sql()?;

    let client = state.pool().get().await?;

    let account_result = client.query_opt(&account_query, &[]).await?;
    let Some(account) = account_result else {
        return Err(Error::NotFound);
    };

    let password_column = account.get::<&str, String>("password");
    let row_column = account.get::<&str, Role>("role");

    let ag2 = Argon2::default();
    let password_hash = PasswordHash::new(&password_column)?;
    ag2.verify_password(body.password.as_bytes(), &password_hash)?;

    let now = jiff::Timestamp::now();
    let access_token_claims = AccessTokenClaims::new(
        account.get::<&str, String>("id"),
        now,
        now.checked_add(15.minutes())?,
        API_HOST.to_string(),
        JWT_ISSUER.to_string(),
        row_column,
    );
    let access_token_header = Header::new(Algorithm::RS256);
    let access_token = encode(&access_token_header, &access_token_claims, &ENCODING_KEY).unwrap();

    let refresh_token_id = Ulid::new();
    let refresh_token_duration = 30.days();
    let refresh_token_expires = now.checked_add(refresh_token_duration)?;
    let refresh_token_claims = RefreshTokenClaims::new(
        refresh_token_id.to_string(),
        now,
        refresh_token_expires,
        API_HOST.to_string(),
        JWT_ISSUER.to_string(),
    );
    let refresh_token_header = Header::new(Algorithm::RS256);
    let refresh_token =
        encode(&refresh_token_header, &refresh_token_claims, &ENCODING_KEY).unwrap();

    let refresh_token_cookie = Cookie::build((REFRESH_TOKEN_COOKIE_KEY, refresh_token.clone()))
        .domain(format!("{}://{}", *API_PROTOCOL, *API_HOST))
        .path(REFRESH_TOKEN_COOKIE_PATH)
        .http_only(true)
        .max_age(Duration::seconds(REFRESH_TOKEN_EXPIRATION_DURATION))
        .secure(false)
        .same_site(SameSite::Lax)
        .build();

    let jar = jar.add(refresh_token_cookie);
    let response = SigninResponse::new(access_token);

    Ok((StatusCode::OK, jar, axum::Json(response)).into_response())
}
