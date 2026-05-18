use crate::error::AppError;
use serde::Deserialize;

#[derive(Clone, Debug, Deserialize)]
pub struct Config {
    pub host: String,
    pub port: u16,
    pub mongo_uri: String,
    // pub redis_url: Option<String>,
}

impl Config {
    pub fn from_env() -> Result<Self, AppError> {
        let host = dotenv::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());

        let port = dotenv::var("PORT")
            .unwrap_or_else(|_| "8000".to_string())
            .parse::<u16>()
            .map_err(|_| AppError::Config("PORT must be a valid u16".into()))?;

        let mongo_uri =
            std::env::var("MONGO_DB").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());

        // let redis_url = std::env::var("REDIS_URL").ok();

        Ok(Self {
            host,
            port,
            mongo_uri,
        })
    }
}
