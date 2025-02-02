use axum::{
    extract::{rejection::PathRejection, FromRequestParts},
    http::StatusCode,
};
use serde::de::DeserializeOwned;

use crate::error::ErrorBody;

/// Our in-house path extractor for better error shape handling.
pub struct Path<T>(pub T);

impl<S, T> FromRequestParts<S> for Path<T>
where
    T: DeserializeOwned + Send,
    S: Send + Sync,
{
    type Rejection = (StatusCode, axum::Json<ErrorBody>);

    async fn from_request_parts(
        parts: &mut axum::http::request::Parts,
        state: &S,
    ) -> Result<Self, Self::Rejection> {
        match axum::extract::Path::<T>::from_request_parts(parts, state).await {
            Ok(value) => Ok(Self(value.0)),
            Err(rejection) => {
                let (status, body) = match rejection {
                    PathRejection::FailedToDeserializePathParams(error) => (
                        StatusCode::BAD_REQUEST,
                        ErrorBody::new(StatusCode::BAD_REQUEST, format!("{}", error.to_string())),
                    ),
                    PathRejection::MissingPathParams(error) => (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        ErrorBody::new(
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!("{}", error.to_string()),
                        ),
                    ),
                    _ => (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        ErrorBody::new(
                            StatusCode::INTERNAL_SERVER_ERROR,
                            format!(
                                "Unhandled path deserialization error: {}",
                                rejection.to_string()
                            ),
                        ),
                    ),
                };

                Err((status, axum::Json(body)))
            }
        }
    }
}
