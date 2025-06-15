use std::sync::Mutex;
use crate::db::Database;

pub struct AppState {
    pub database: Mutex<Database>,
}

impl AppState {
    pub async fn new(database: Database) -> Self{
        AppState {
            database: Mutex::new(database),
        }
    }
}