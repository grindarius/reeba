use axum::http::StatusCode;
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    status_code: u16,
    error: String,
    message: String,
}

impl ErrorResponse {
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
