use axum::extract::State;
use serde::Deserialize;

use crate::{error::http_error::HttpError, state::SharedState};

#[derive(Debug, Deserialize)]
pub struct SignupResponseBody {
    username: String,
    email: String,
    password: String,
}

impl Default for SignupResponseBody {
    fn default() -> Self {
        Self {
            username: "worker2194".to_string(),
            email: "worker_everyday@yahoo.com".to_string(),
            password: "lsdkmfi0if3DmKDFo23".to_string(),
        }
    }
}

pub async fn handler(state: State<SharedState>) -> Result<SignupResponseBody, HttpError> {}
