// use std::env;
use dotenv;
use mongodb::{Client, Collection};
// use serde::{Deserialize, Serialize};

use crate::blog_model;
use crate::project_model;

pub struct Database {
    pub blogs: Collection<blog_model::Blog>,
    pub projects: Collection<project_model::Project>,
}

impl Database {
    pub async fn init() -> Self {
        let uri = match dotenv::var("MONGO_DB") {
            Ok(v) => v.to_string(),
            Err(e) => e.to_string(),
        };
        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("Blogs");
        let blogs_collection: Collection<blog_model::Blog> = db.collection("blogs");
        let projects_collection: Collection<project_model::Project> = db.collection("projects");
        Database {
            blogs: blogs_collection,
            projects: projects_collection,
        }
    }
}
