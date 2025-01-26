use std::sync::{Arc, LazyLock};

use axum::{middleware, routing::get, Router};
use environment_variables::{API_HOST, API_PROTOCOL};
use error::not_found::global_not_found;
use gcloud_sdk::GoogleRestApi;
use openapi::{apidoc::ApiDoc, apikey_middleware::require_apikey_middleware};
use pool::init_pool;
use state::SharedState;
use telemetry::{init_telemetry, make_span, on_request, on_response};
use tower_http::trace::TraceLayer;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

mod environment_variables;
mod error;
mod macros;
mod openapi;
mod pool;
mod routes;
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

    // App global state setup
    let state = Arc::new(SharedState::new(database_pool, google_cloud_client));

    let routes = Router::new().route("/", get(crate::routes::handler));

    let app = Router::new()
        .merge(SwaggerUi::new("/docs").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .merge(routes)
        .layer(middleware::from_fn(require_apikey_middleware))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(make_span)
                .on_request(on_request)
                .on_response(on_response)
                .on_body_chunk(())
                .on_eos(())
                .on_failure(()),
        )
        .with_state(state)
        .fallback(global_not_found);

    let listener = tokio::net::TcpListener::bind(LazyLock::force(&API_HOST))
        .await
        .unwrap();

    tracing::info!(
        "listening on {}://{}",
        *API_PROTOCOL,
        listener.local_addr().unwrap()
    );
    tracing::info!(
        "documentation server started at {}://{}/docs",
        *API_PROTOCOL,
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}
