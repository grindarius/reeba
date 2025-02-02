use axum::{
    extract::{rejection::JsonRejection, FromRequest},
    http::StatusCode,
};

use crate::error::ErrorBody;

/// Our in-house json extractor to streamline error handling into one shape of response so that the
/// frontend would be able to parse them and not having to expect multiple types/shapes of
/// responses.
pub struct Json<T>(pub T);

impl<S, T> FromRequest<S> for Json<T>
where
    axum::Json<T>: FromRequest<S, Rejection = JsonRejection>,
    S: Send + Sync,
{
    type Rejection = (StatusCode, axum::Json<ErrorBody>);

    async fn from_request(req: axum::extract::Request, state: &S) -> Result<Self, Self::Rejection> {
        match axum::Json::<T>::from_request(req, state).await {
            Ok(value) => Ok(Self(value.0)),
            Err(rejection) => {
                let error_body = ErrorBody::new(rejection.status(), rejection.to_string());
                Err((rejection.status(), axum::Json(error_body)))
            }
        }
    }
}
