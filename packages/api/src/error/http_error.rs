use axum::{
    http::{header, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::Serialize;
use utoipa::ToSchema;

/// Any type of error that could have happened during the API execution. Every route handler will
/// spit this out.
#[derive(Debug)]
pub enum HttpError {
    NotFound,
    PasswordDoNotMatch,
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
        let (status, message): (StatusCode, String) = match self {
            HttpError::NotFound => (StatusCode::NO_CONTENT, String::from("")),
            HttpError::PasswordDoNotMatch => (
                StatusCode::BAD_REQUEST,
                "Your password does not match our criteria for safety.".to_string(),
            ),
        };

        if status == StatusCode::NO_CONTENT {
            return (status, [(header::CONTENT_TYPE, "application/json")]).into_response();
        }

        let body = ErrorBody::new(status, message);
        (status, Json(body)).into_response()
    }
}
