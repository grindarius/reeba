/// Macro to load an environment variable as a required environment variable in the project. If the
/// environment variable is not present (Getting an error from [`std::env::var`]) or if it's
/// present but empty, then it will crash the program.
///
/// ```rust
/// // environment_variables.rs
/// use crate::macros::required_env;
///
/// required_env(API_URL);
/// ```
///
/// Then you can import it like.
/// ```rust
/// // main.rs
/// use crate::environment_variables::API_URL;
/// ```
macro_rules! required_env {
    ($env_name: ident) => {
        pub static $env_name: ::std::sync::LazyLock<::std::string::String> = ::std::sync::LazyLock::new(|| {
            match ::std::env::var(stringify!($env_name)) {
                Ok(env) => {
                    if env.is_empty() {
                        panic!("Environment variable \"{}\" is present but it's an empty string.", stringify!($env_name));
                    } else {
                        return env;
                    }
                },
                Err(e) => match e {
                    ::std::env::VarError::NotPresent => panic!("Environment variable \"{}\" not present.", stringify!($env_name)),
                    ::std::env::VarError::NotUnicode(v) => panic!("Environment variable \"{}\" is present but value is not a valid utf-8. The value is \"{:?}\"", stringify!($env_name), v),
                }
            }
        });
    }
}

/// Macro to load an environment variable as an optional environment variable in the project. If the
/// environment variable is not present (Getting an error from [`std::env::var`]) or if it's
/// present but empty, it will return [`std::option::None`].
///
/// ```rust
/// // environment_variables.rs
/// use crate::macros::optional_env;
///
/// optional_env(API_URL);
/// ```
///
/// Then you can import it like.
/// ```rust
/// // main.rs
/// use crate::environment_variables::API_URL;
/// ```
macro_rules! optional_env {
    ($env_name: ident) => {
        pub static $env_name: ::std::sync::LazyLock<::std::option::Option<::std::string::String>> =
            ::std::sync::LazyLock::new(|| match ::std::env::var(stringify!($env_name)) {
                Ok(env) => {
                    if env.is_empty() {
                        return None;
                    } else {
                        return Some(env);
                    }
                }
                Err(_e) => None,
            });
    };
}

pub(crate) use optional_env;
pub(crate) use required_env;
