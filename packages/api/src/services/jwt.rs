use std::sync::LazyLock;

use jsonwebtoken::{DecodingKey, EncodingKey};
use postgres_types::{FromSql, ToSql};
use serde::{Deserialize, Serialize};

pub static ENCODING_KEY: LazyLock<EncodingKey> = LazyLock::new(|| {
    let key_path = std::env::var("REEBA_RSA_PRIVATE_KEY").expect("Environment variable `REEBA_RSA_PRIVATE_KEY` is required to be set as path of the private key file.");

    let file = match std::fs::read(&key_path) {
        Ok(v) => v,
        Err(e) => {
            panic!(
                "Unexpected error occurred while trying to open `{}`: {}",
                key_path, e
            );
        }
    };

    match EncodingKey::from_rsa_pem(&file) {
        Ok(key) => key,
        Err(e) => {
            panic!("Unexpected error during encoding key preparation: {}", e)
        }
    }
});

pub static DECODING_KEY: LazyLock<DecodingKey> = LazyLock::new(|| {
    let key_path = std::env::var("REEBA_RSA_PUBLIC_KEY").expect("Environment variable `REEBA_RSA_PUBLIC_KEY` is required to be set as path of the private key file.");

    let file = match std::fs::read(&key_path) {
        Ok(v) => v,
        Err(e) => {
            panic!(
                "Unexpected error occurred while trying to open `{}`: {}",
                key_path, e
            );
        }
    };

    match DecodingKey::from_rsa_pem(&file) {
        Ok(key) => key,
        Err(e) => {
            panic!("Unexpected error during decoding key preparation: {}", e)
        }
    }
});

/// The JWT issuer of the API, if does not match will throw a 401 Unauthorized error stating that
/// issuer does not match.
pub const JWT_ISSUER: &str = "reeba-api";

/// 30 days in seconds or idk.
pub const REFRESH_TOKEN_EXPIRATION_DURATION: i64 = 60 * 60 * 24 * 30;

pub const REFRESH_TOKEN_COOKIE_KEY: &str = "x-refresh-token";
pub const REFRESH_TOKEN_COOKIE_PATH: &str = "/refresh";

/// The possible roles in each account.
#[derive(Debug, Clone, Copy, Deserialize, Serialize, PartialEq, Eq, ToSql, FromSql)]
#[serde(rename_all = "lowercase")]
pub enum Role {
    User,
    Admin,
}

/// Claims of a generated access token.
#[derive(Debug, Deserialize, Serialize)]
pub struct AccessTokenClaims {
    /// The account's id.
    sub: String,
    /// When the token is issued.
    iat: jiff::Timestamp,
    /// When the token expires.
    exp: jiff::Timestamp,
    /// The issuer.
    iss: String,
    /// The token's audience. defaults to `reeba-api`.
    aud: String,
    /// The associated token's role.
    role: Role,
}

impl AccessTokenClaims {
    pub fn new(
        account_id: String,
        issued_at: jiff::Timestamp,
        expires: jiff::Timestamp,
        issuer: String,
        audience: String,
        role: Role,
    ) -> Self {
        Self {
            sub: account_id,
            iat: issued_at,
            exp: expires,
            iss: issuer,
            aud: audience,
            role,
        }
    }

    pub fn sub(&self) -> &str {
        &self.sub
    }

    pub fn iat(&self) -> jiff::Timestamp {
        self.iat
    }

    pub fn exp(&self) -> jiff::Timestamp {
        self.exp
    }

    pub fn aud(&self) -> &str {
        &self.aud
    }

    pub fn role(&self) -> Role {
        self.role
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RefreshTokenClaims {
    /// The refresh token's id in database.
    sub: String,
    /// When the token is issued.
    iat: jiff::Timestamp,
    /// When the token expires.
    exp: jiff::Timestamp,
    /// The issuer.
    iss: String,
    /// The token's audience. defaults to `reeba-api-refresh-token`.
    aud: String,
}

impl RefreshTokenClaims {
    pub fn new(
        refresh_token_id: String,
        issued_at: jiff::Timestamp,
        expires: jiff::Timestamp,
        issuer: String,
        audience: String,
    ) -> Self {
        Self {
            sub: refresh_token_id,
            iat: issued_at,
            exp: expires,
            iss: issuer,
            aud: audience,
        }
    }

    pub fn sub(&self) -> &str {
        &self.sub
    }

    pub fn iat(&self) -> jiff::Timestamp {
        self.iat
    }

    pub fn exp(&self) -> jiff::Timestamp {
        self.exp
    }

    pub fn aud(&self) -> &str {
        &self.aud
    }
}
