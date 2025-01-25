use std::{fmt::Display, sync::Arc};

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use eloquent::Eloquent;
use serde::Deserialize;
use ulid::Ulid;

use crate::{error::http_error::HttpError, state::SharedState};

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

    verify_password(&body.password)?;

    let insert_account_query = Eloquent::query()
        .table("accounts")
        .insert("id", Ulid::new().to_string())
        .insert("username", body.username)
        .insert("email", body.email);

    Ok((StatusCode::OK).into_response())
}

#[derive(Debug)]
pub enum PasswordVerificationError {
    TooShort,
    NotAsciiCharacters,
    MissingNumberRequirement,
    MissingSmallLetterRequirement,
    MissingSpecialCharacterRequirement,
}

impl Display for PasswordVerificationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                PasswordVerificationError::TooShort =>
                    "Password too short, minimum length of password should be 16 characters.",
                PasswordVerificationError::NotAsciiCharacters =>
                    "Password contains non-ascii characters.",
                PasswordVerificationError::MissingNumberRequirement =>
                    "Password does not have at least 1 number.",
                PasswordVerificationError::MissingSmallLetterRequirement =>
                    "Password does not have at least 1 small letter.",
                PasswordVerificationError::MissingSpecialCharacterRequirement =>
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
fn verify_password(password: &str) -> Result<(), PasswordVerificationError> {
    // Check non-ascii characters
    if !password.is_ascii() {
        return Err(PasswordVerificationError::NotAsciiCharacters);
    }

    // Check chars count
    if password.chars().count() < 16 {
        return Err(PasswordVerificationError::TooShort);
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
        return Err(PasswordVerificationError::MissingNumberRequirement);
    }

    if small_letter_count == 0 {
        return Err(PasswordVerificationError::MissingSmallLetterRequirement);
    }

    if special_characters_count == 0 {
        return Err(PasswordVerificationError::MissingSpecialCharacterRequirement);
    }

    Ok(())
}
