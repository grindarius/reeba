use axum::{
    http::{StatusCode, Uri},
    response::IntoResponse,
    Json,
};

use super::http_error::ErrorBody;

/// Global path not found error when someone queries an unknown route.
pub async fn global_not_found(uri: Uri) -> impl IntoResponse {
    let response = ErrorBody::new(
        StatusCode::NOT_FOUND,
        format!("Path with uri `{}` not found", uri),
    );

    (StatusCode::NOT_FOUND, Json(response)).into_response()
}
