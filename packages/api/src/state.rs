use std::sync::LazyLock;

use deadpool_postgres::Pool;
use gcloud_sdk::{google_rest_apis::storage_v1::configuration::Configuration, GoogleRestApi};

use crate::environment_variables::{STORAGE_EMULATOR_ENABLED, STORAGE_EMULATOR_URL};

#[derive(Clone)]
pub struct State {
    pool: Pool,
    google_cloud_client: GoogleRestApi,
}

impl State {
    const DEFAULT_EMULATOR_URL: &str = "http://127.0.0.1:4443";

    pub fn new(pool: Pool, google_cloud_client: GoogleRestApi) -> Self {
        Self {
            pool,
            google_cloud_client,
        }
    }

    pub fn pool(&self) -> &Pool {
        &self.pool
    }

    pub fn gcloud_client(&self) -> &GoogleRestApi {
        &self.google_cloud_client
    }

    pub async fn create_google_storage_config(
        &self,
    ) -> Result<Configuration, gcloud_sdk::error::Error> {
        let emulator_enabled = LazyLock::force(&STORAGE_EMULATOR_ENABLED).as_ref();

        if emulator_enabled == Some(&String::from("0")) {
            return self
                .google_cloud_client
                .create_google_storage_v1_config()
                .await;
        }

        Ok(self.create_local_google_storage_config())
    }

    fn create_local_google_storage_config(&self) -> Configuration {
        Configuration {
            client: self.google_cloud_client.client.clone(),
            base_path: format!(
                "{}/storage/v1",
                LazyLock::force(&STORAGE_EMULATOR_URL)
                    .as_ref()
                    .unwrap_or(&State::DEFAULT_EMULATOR_URL.to_string())
            ),
            ..Default::default()
        }
    }
}
