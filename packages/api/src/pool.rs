use deadpool_postgres::{Config, ManagerConfig, Pool, PoolConfig, RecyclingMethod, Runtime};
use tokio_postgres::NoTls;

use crate::environment_variables::{
    POSTGRES_DBNAME, POSTGRES_HOSTNAME, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME,
};

/// Initialize database pool managed by `deadpool_postgres`.
pub fn init_pool() -> Pool {
    let mut config = Config::new();

    config.user = Some(POSTGRES_USERNAME.to_string());
    config.password = Some(POSTGRES_PASSWORD.to_string());
    config.host = Some(POSTGRES_HOSTNAME.to_string());
    config.port = Some(
        POSTGRES_PORT
            .parse::<u16>()
            .expect("Cannot convert \"POSTGRES_PORT\" to u16"),
    );
    config.dbname = Some(POSTGRES_DBNAME.to_string());
    config.manager = Some(ManagerConfig {
        recycling_method: RecyclingMethod::Fast,
    });
    config.pool = Some(PoolConfig::new(10));

    config
        .create_pool(Some(Runtime::Tokio1), NoTls)
        .expect("Cannot create postgres main pool from a given config")
}
