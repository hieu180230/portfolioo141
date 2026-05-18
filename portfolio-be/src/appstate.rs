use crate::config::Config;
use crate::db::Database;

use std::sync::Mutex;

pub struct AppState {
    pub config: Config,
    pub database: Mutex<Database>,
}

impl AppState {
    pub async fn new(config: Config, database: Database) -> Self {
        AppState {
            config,
            database: Mutex::new(database),
        }
    }
}
