use std::fmt::Display;

use argon2::password_hash;
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

use crate::services::password::PasswordIntegrityError;

pub mod not_found;

/// Any type of error that could have happened during the API execution. Every route handler will
/// spit this out.
#[derive(Debug)]
pub enum Error {
    NotFound,
    DuplicateEmail(String),
    DuplicateUsername(String),
    PasswordIntegrityError(PasswordIntegrityError),
    Argon2Error(argon2::Error),
    PasswordHashError(argon2::password_hash::Error),
    PoolError(deadpool_postgres::PoolError),
    SqlConstructionError(eloquent::error::EloquentError),
    TokioPostgresError(tokio_postgres::error::Error),
    JiffError(jiff::Error),
    InternalServerError { reason: String },
}

impl Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::NotFound => "".to_string(),
                Self::DuplicateEmail(email) =>
                    format!("The email `{}` has already been registered.", email),
                Self::DuplicateUsername(username) =>
                    format!("The username `{}` has already been registered.", username),
                Self::PasswordIntegrityError(pve) => format!("Password integrity error: {}", pve),
                Self::Argon2Error(ag2e) => format!("Argon2 error: {}", ag2e),
                Self::PasswordHashError(phe) => format!("Password hash error: {}", phe),
                Self::PoolError(pe) => format!("Database pool error: {}", pe),
                Self::SqlConstructionError(elqe) => format!("SQL construction error: {}", elqe),
                Self::TokioPostgresError(tpe) =>
                    format!("Tokio postgres prepare and query error: {}", tpe),
                Self::JiffError(je) => format!("Jiff error: {}", je),
                Self::InternalServerError { reason } =>
                    format!("Unknown internal server error: {}", reason),
            }
        )
    }
}

impl From<PasswordIntegrityError> for Error {
    fn from(value: PasswordIntegrityError) -> Self {
        Error::PasswordIntegrityError(value)
    }
}

impl From<EloquentError> for Error {
    fn from(value: EloquentError) -> Self {
        Error::SqlConstructionError(value)
    }
}

impl From<argon2::Error> for Error {
    fn from(value: argon2::Error) -> Self {
        Error::Argon2Error(value)
    }
}

impl From<PoolError> for Error {
    fn from(value: PoolError) -> Self {
        Error::PoolError(value)
    }
}

impl From<argon2::password_hash::Error> for Error {
    fn from(value: argon2::password_hash::Error) -> Self {
        Error::PasswordHashError(value)
    }
}

impl From<tokio_postgres::error::Error> for Error {
    fn from(value: tokio_postgres::error::Error) -> Self {
        Error::TokioPostgresError(value)
    }
}

impl From<InvalidHeaderValue> for Error {
    fn from(value: InvalidHeaderValue) -> Self {
        Error::InternalServerError {
            reason: value.to_string(),
        }
    }
}

impl From<jiff::Error> for Error {
    fn from(value: jiff::Error) -> Self {
        Error::JiffError(value)
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        let status = match self {
            Error::NotFound => StatusCode::NO_CONTENT,
            Error::PasswordIntegrityError(_)
            | Error::DuplicateEmail(_)
            | Error::DuplicateUsername(_) => StatusCode::BAD_REQUEST,
            Error::PasswordHashError(phe) => match phe {
                password_hash::Error::Password => StatusCode::BAD_REQUEST,
                _ => StatusCode::INTERNAL_SERVER_ERROR,
            },
            Error::Argon2Error(_)
            | Error::PoolError(_)
            | Error::SqlConstructionError(_)
            | Error::TokioPostgresError(_)
            | Error::JiffError(_)
            | Error::InternalServerError { .. } => StatusCode::INTERNAL_SERVER_ERROR,
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
