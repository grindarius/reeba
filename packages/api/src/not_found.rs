use axum::{
    http::{StatusCode, Uri},
    response::IntoResponse,
    Json,
};

use crate::error::ErrorResponse;

/// Global path not found error when someone queries an unknown route.
pub async fn global_not_found(uri: Uri) -> impl IntoResponse {
    let response = ErrorResponse::new(
        StatusCode::NOT_FOUND,
        format!("Path with uri {} not found", uri),
    );

    (StatusCode::NOT_FOUND, Json(response)).into_response()
}
