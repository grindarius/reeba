pub mod auth;

#[utoipa::path(
    get,
    path = "/",
    tag = "misc",
    operation_id = "hello_server",
    responses(
        (
            status = 200,
            description = "Server responds successfully."
        )
    )
)]
pub async fn handler() -> &'static str {
    "Hello from new reeba backend."
}
