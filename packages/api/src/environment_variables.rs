use crate::macros::{optional_env, required_env};

required_env!(JWT_SECRET);
required_env!(ARGON2_PEPPER);

required_env!(POSTGRES_USERNAME);
required_env!(POSTGRES_PASSWORD);
required_env!(POSTGRES_HOSTNAME);
required_env!(POSTGRES_PORT);
required_env!(POSTGRES_DBNAME);
required_env!(APP_NAME);

optional_env!(API_PORT);
optional_env!(API_HOST);

// Denotes whether we're using emulator layer. Can only accept `0` or `1`. Default is `1`.
optional_env!(STORAGE_EMULATOR_ENABLED);

// Storage emulator URL if you are running in emulator mode. Otherwise the default value is
// `http://127.0.0.1:4443`
optional_env!(STORAGE_EMULATOR_URL);
