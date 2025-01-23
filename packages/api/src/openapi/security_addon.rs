use utoipa::{
    openapi::security::{ApiKey, ApiKeyValue, SecurityScheme},
    Modify,
};

use crate::environment_variables::SWAGGER_API_KEY_NAME;

pub struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let components = openapi
            .components
            .as_mut()
            .expect("no components assigned in the utoipa::path");

        components.add_security_scheme(
            "api-key",
            SecurityScheme::ApiKey(ApiKey::Header(ApiKeyValue::new(
                SWAGGER_API_KEY_NAME.to_owned(),
            ))),
        )
    }
}
