use std::fmt::Display;

use axum::{
    http::{header, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::Serialize;
use utoipa::ToSchema;

use crate::routes::auth::signup::PasswordVerificationError;

/// Any type of error that could have happened during the API execution. Every route handler will
/// spit this out.
#[derive(Debug)]
pub enum HttpError {
    NotFound,
    PasswordDoNotMatch,
    PasswordError(PasswordVerificationError),
}

impl Display for HttpError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                HttpError::NotFound => "".to_string(),
                HttpError::PasswordDoNotMatch =>
                    "Your given password does not match with what's inside our database."
                        .to_string(),
                HttpError::PasswordError(pve) =>
                    format!("Password verification error: {}", pve.to_string()),
            }
        )
    }
}

/// The body of the error if exists.
#[derive(Debug, Serialize, ToSchema)]
pub struct ErrorBody {
    status_code: u16,
    error: String,
    message: String,
}

impl ErrorBody {
    pub fn new(code: StatusCode, message: String) -> Self {
        Self {
            status_code: code.as_u16(),
            error: code
                .canonical_reason()
                .unwrap_or("Unknown Canonical Reason")
                .to_owned(),
            message,
        }
    }
}

impl IntoResponse for HttpError {
    fn into_response(self) -> axum::response::Response {
        let status = match self {
            HttpError::NotFound => StatusCode::NO_CONTENT,
            HttpError::PasswordDoNotMatch => StatusCode::BAD_REQUEST,
            HttpError::PasswordError(_) => StatusCode::BAD_REQUEST,
        };

        if status == StatusCode::NO_CONTENT {
            return (status, [(header::CONTENT_TYPE, "application/json")]).into_response();
        }

        let body = ErrorBody::new(status, self.to_string());
        (status, Json(body)).into_response()
    }
}
