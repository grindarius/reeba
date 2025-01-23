use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Debug)]
pub enum HttpError {
    NotFound,
    PasswordDoNotMatch,
}

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
            return (status).into_response();
        }

        let body = ErrorBody::new(status, message);
        (status, Json(body)).into_response()
    }
}
