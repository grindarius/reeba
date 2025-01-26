use std::{fmt::Display, sync::Arc};

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, Params,
};
use axum::{
    extract::State,
    http::{HeaderMap, HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use eloquent::{Eloquent, ToSql};
use serde::Deserialize;
use tokio_postgres::Statement;
use ulid::Ulid;

use crate::{
    environment_variables::{API_HOST, API_PROTOCOL},
    error::HttpError,
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
) -> Result<Response, HttpError> {
    let client = state.pool().get().await?;

    verify_password_integrity(&body.password)?;

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
        return Err(HttpError::DuplicateEmail { email: body.email });
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
        return Err(HttpError::DuplicateUsername {
            username: body.username,
        });
    }

    let salt = SaltString::generate(&mut OsRng);
    let ag2 = Argon2::new(
        argon2::Algorithm::Argon2id,
        argon2::Version::V0x13,
        Params::new(21000, 2, 1, Some(32))?,
    );

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

#[derive(Debug)]
pub enum PasswordIntegrityError {
    TooShort,
    NotAsciiCharacters,
    MissingNumberRequirement,
    MissingSmallLetterRequirement,
    MissingSpecialCharacterRequirement,
}

impl Display for PasswordIntegrityError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::TooShort =>
                    "Password too short, minimum length of password should be 16 characters.",
                Self::NotAsciiCharacters => "Password contains non-ascii characters.",
                Self::MissingNumberRequirement => "Password does not have at least 1 number.",
                Self::MissingSmallLetterRequirement =>
                    "Password does not have at least 1 small letter.",
                Self::MissingSpecialCharacterRequirement =>
                    "Password does not have at least 1 species ascii character.",
            }
        )
    }
}

/// Verifies a given password from user.
///
/// This password verifier verifies that a given password must
/// - Be at least 16 characters long.
/// - Valid ASCII characters.
/// - Have minimum of 1 capital letter
/// - Have minimum of 1 normal letter.
/// - Have minimum of 1 number.
/// - Have minimum of 1 special characters that ASCII supports
fn verify_password_integrity(password: &str) -> Result<(), PasswordIntegrityError> {
    // Check non-ascii characters
    if !password.is_ascii() {
        return Err(PasswordIntegrityError::NotAsciiCharacters);
    }

    // Check chars count
    if password.chars().count() < 16 {
        return Err(PasswordIntegrityError::TooShort);
    }

    // For loop to check the other 3 cases.
    let mut small_letter_count = 0;
    let mut special_characters_count = 0;
    let mut numbers_count = 0;

    for c in password.chars() {
        if c.is_ascii_digit() {
            numbers_count += 1;
        } else if c.is_ascii_lowercase() {
            small_letter_count += 1;
        } else if c.is_ascii_punctuation() {
            special_characters_count += 1;
        }
    }

    if numbers_count == 0 {
        return Err(PasswordIntegrityError::MissingNumberRequirement);
    }

    if small_letter_count == 0 {
        return Err(PasswordIntegrityError::MissingSmallLetterRequirement);
    }

    if special_characters_count == 0 {
        return Err(PasswordIntegrityError::MissingSpecialCharacterRequirement);
    }

    Ok(())
}
