use crate::db::Database;
use std::sync::Mutex;

pub struct AppState {
    pub database: Mutex<Database>,
}

impl AppState {
    pub async fn new(database: Database) -> Self {
        AppState {
            database: Mutex::new(database),
        }
    }
}
