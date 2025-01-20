use gcloud_sdk::GoogleRestApi;
use pool::init_pool;
use telemetry::init_telemetry;

mod environment_variables;
mod macros;
mod pool;
mod state;
mod telemetry;

#[tokio::main]
async fn main() {
    // initialize telemetry.
    let _guard = init_telemetry();

    // initialize database pool.
    let database_pool = init_pool();

    // Google Cloud Storage setup
    let google_cloud_client = GoogleRestApi::new()
        .await
        .expect("Failed to initialize Google Cloud API Client");

    println!("Hello, world!");
}
