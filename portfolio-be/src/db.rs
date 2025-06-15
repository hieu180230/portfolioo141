use std::env;
use mongodb::{Client, Collection};
use dotenv;
use serde::{Deserialize, Serialize};
use shuttle_runtime::SecretStore;

use crate::blog_model;
use crate::project_model;

pub struct Database {
    pub blogs: Collection<blog_model::Blog>,
    pub projects: Collection<project_model::Project>,
}

impl Database {
    pub async fn init(secrets: SecretStore,) -> Self {

        let secret = secrets.get("MONGO_DB").unwrap();

        // let uri = match dotenv::var("MONGO_DB") {
        //     Ok(v) => v.to_string(),
        //     Err(e) => e.to_string(),
        // };

        let client = Client::with_uri_str(secret).await.unwrap();
        let db = client.database("Blogs");
        let blogs_collection: Collection<blog_model::Blog> = db.collection("blogs");
        let projects_collection: Collection<project_model::Project> = db.collection("projects");
        Database {
            blogs: blogs_collection,
            projects: projects_collection,
        }

    }
}