use std::sync::Arc;

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2,
};
use axum::{
    extract::State,
    http::{HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
};
use eloquent::{Eloquent, ToSql};
use serde::Deserialize;
use ulid::Ulid;

use crate::{
    environment_variables::{API_HOST, API_PROTOCOL},
    error::Error,
    extract::json::Json,
    services::password::verify_password_integrity,
    state::SharedState,
};

#[derive(Debug, Deserialize)]
pub struct SignupRequestBody {
    username: String,
    email: String,
    password: String,
}

impl Default for SignupRequestBody {
    fn default() -> Self {
        Self {
            username: "worker2194".to_string(),
            email: "worker_everyday@yahoo.com".to_string(),
            password: "lsdkmfi0if3DmKDFo23".to_string(),
        }
    }
}

pub async fn handler(
    State(state): State<Arc<SharedState>>,
    Json(body): Json<SignupRequestBody>,
) -> Result<Response, Error> {
    verify_password_integrity(&body.password)?;

    let client = state.pool().get().await?;
    let possible_duplicate_emails_statement = client
        .prepare(
            r##"
                select
                    1
                from accounts
                where email = lower($1)
            "##,
        )
        .await?;

    let possible_duplicate_emails = client
        .query(&possible_duplicate_emails_statement, &[&body.email])
        .await?;

    if !possible_duplicate_emails.is_empty() {
        return Err(Error::DuplicateEmail(body.email));
    }

    let possible_duplicate_usernames_statement = client
        .prepare(
            r##"
                select
                    1
                from accounts
                where username = $1
            "##,
        )
        .await?;

    let possible_duplicate_usernames = client
        .query(&possible_duplicate_usernames_statement, &[&body.username])
        .await?;

    if !possible_duplicate_usernames.is_empty() {
        return Err(Error::DuplicateUsername(body.username));
    }

    let salt = SaltString::generate(&mut OsRng);
    let ag2 = Argon2::default();

    let encrypted_password = ag2.hash_password(body.password.as_bytes(), &salt)?;

    let account_id = Ulid::new();
    let insert_account_query = Eloquent::query()
        .table("accounts")
        .insert("id", account_id.to_string())
        .insert("username", body.username)
        .insert("email", body.email)
        .insert("password", encrypted_password.to_string());

    client.query(&insert_account_query.to_sql()?, &[]).await?;

    let mut headers = HeaderMap::new();
    headers.append(
        "Location",
        HeaderValue::from_str(&format!(
            "{}://{}/accounts/{}",
            *API_PROTOCOL, *API_HOST, account_id
        ))?,
    );

    Ok((StatusCode::CREATED, headers).into_response())
}
