use super::security_addon::SecurityAddon;

#[derive(utoipa::OpenApi)]
#[openapi(
    paths(
        crate::routes::handler
    ),
    modifiers(
        &SecurityAddon
    ),
    tags(
        (
            name = "misc", description = "miscellaneous"
        )
    )
)]
pub struct ApiDoc;
