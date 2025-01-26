use std::fmt::Display;

use axum::{
    http::{
        header::{self, InvalidHeaderValue},
        StatusCode,
    },
    response::IntoResponse,
    Json,
};
use deadpool_postgres::PoolError;
use eloquent::error::EloquentError;
use serde::Serialize;
use utoipa::ToSchema;

use crate::routes::auth::signup::PasswordIntegrityError;

pub mod not_found;

/// Any type of error that could have happened during the API execution. Every route handler will
/// spit this out.
#[derive(Debug)]
pub enum HttpError {
    NotFound,
    DuplicateEmail { email: String },
    DuplicateUsername { username: String },
    PasswordIntegrityError(PasswordIntegrityError),
    Argon2Error(argon2::Error),
    PasswordHashError(argon2::password_hash::Error),
    PoolError(deadpool_postgres::PoolError),
    SqlConstructionError(eloquent::error::EloquentError),
    TokioPostgresError(tokio_postgres::error::Error),
    InternalServerError { reason: String },
}

impl Display for HttpError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::NotFound => "".to_string(),
                Self::DuplicateEmail { email } =>
                    format!("The email `{}` has already been registered.", email),
                Self::DuplicateUsername { username } =>
                    format!("The username `{}` has already been registered.", username),
                Self::PasswordIntegrityError(pve) =>
                    format!("Password integrity error: {}", pve.to_string()),
                Self::Argon2Error(ag2e) => format!("Argon2 error: {}", ag2e.to_string()),
                Self::PasswordHashError(phe) => format!("Password hash error: {}", phe.to_string()),
                Self::PoolError(pe) => format!("Database pool error: {}", pe.to_string()),
                Self::SqlConstructionError(elqe) =>
                    format!("SQL construction error: {}", elqe.to_string()),
                Self::TokioPostgresError(tpe) => format!(
                    "Tokio postgres prepare and query error: {}",
                    tpe.to_string()
                ),
                Self::InternalServerError { reason } =>
                    format!("Unknown internal server error: {}", reason.to_string()),
            }
        )
    }
}

impl From<PasswordIntegrityError> for HttpError {
    fn from(value: PasswordIntegrityError) -> Self {
        HttpError::PasswordIntegrityError(value)
    }
}

impl From<EloquentError> for HttpError {
    fn from(value: EloquentError) -> Self {
        HttpError::SqlConstructionError(value)
    }
}

impl From<argon2::Error> for HttpError {
    fn from(value: argon2::Error) -> Self {
        HttpError::Argon2Error(value)
    }
}

impl From<PoolError> for HttpError {
    fn from(value: PoolError) -> Self {
        HttpError::PoolError(value)
    }
}

impl From<argon2::password_hash::Error> for HttpError {
    fn from(value: argon2::password_hash::Error) -> Self {
        HttpError::PasswordHashError(value)
    }
}

impl From<tokio_postgres::error::Error> for HttpError {
    fn from(value: tokio_postgres::error::Error) -> Self {
        HttpError::TokioPostgresError(value)
    }
}

impl From<InvalidHeaderValue> for HttpError {
    fn from(value: InvalidHeaderValue) -> Self {
        HttpError::InternalServerError {
            reason: value.to_string(),
        }
    }
}

impl IntoResponse for HttpError {
    fn into_response(self) -> axum::response::Response {
        let status = match self {
            HttpError::NotFound => StatusCode::NO_CONTENT,
            HttpError::PasswordIntegrityError(_)
            | HttpError::DuplicateEmail { .. }
            | HttpError::DuplicateUsername { .. } => StatusCode::BAD_REQUEST,
            HttpError::Argon2Error(_)
            | HttpError::PoolError(_)
            | HttpError::SqlConstructionError(_)
            | HttpError::TokioPostgresError(_)
            | HttpError::PasswordHashError(_) | HttpError::InternalServerError { .. } => StatusCode::INTERNAL_SERVER_ERROR,
        };

        if status == StatusCode::NO_CONTENT {
            return (status, [(header::CONTENT_TYPE, "application/json")]).into_response();
        }

        let body = ErrorBody::new(status, self.to_string());
        (status, Json(body)).into_response()
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
