use std::{fmt::Display, sync::Arc};

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use eloquent::Eloquent;
use serde::{Deserialize, Serialize};
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
    InvalidAsciiCharacters,
    InvalidCapitalLetterRequirement,
    InvalidSmallLetterRequirement,
    InvalidSpecialCharacterRequirement,
}

impl Display for PasswordVerificationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                PasswordVerificationError::TooShort =>
                    "Password too short, minimum length of password should be 16 characters.",
                PasswordVerificationError::InvalidAsciiCharacters =>
                    "Password contains non-ascii characters.",
                PasswordVerificationError::InvalidCapitalLetterRequirement =>
                    "Password does not have at least 1 capital letter.",
                PasswordVerificationError::InvalidSmallLetterRequirement =>
                    "Password does not have at least 1 small letter.",
                PasswordVerificationError::InvalidSpecialCharacterRequirement =>
                    "Password dos not have at least 1 species ascii character.",
            }
        )
    }
}

/// Verifies a given password from user.
///
/// This password verifier verifies that a given password must
/// - Be at least 16 characters long.
/// - Valid ASCII characters.
/// - Have minimum of 1 capital letter and 1 normal letter.
/// - Have minimum of 1 special characters that ASCII supports
fn verify_password(password: &str) -> Result<&str, HttpError> {
    // Checks the length of the password.
}
