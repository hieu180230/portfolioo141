// use std::env;
use dotenv;
use mongodb::{Client, Collection};
// use serde::{Deserialize, Serialize};

use crate::blog_model;
use crate::project_model;
use crate::resume_model;

#[derive(Clone)]
pub struct Database {
    pub blogs: Collection<blog_model::Blog>,
    pub projects: Collection<project_model::Project>,
    pub resumes: Collection<resume_model::Resume>,
}

impl Database {
    pub async fn init() -> Self {
        let uri =
            dotenv::var("MONGO_DB").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
        Self::from_uri(&uri).await
    }

    pub async fn from_uri(uri: &str) -> Self {
        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("Blogs");

        let blogs_collection: Collection<blog_model::Blog> = db.collection("blogs");
        let projects_collection: Collection<project_model::Project> = db.collection("projects");
        let resumes_collection: Collection<resume_model::Resume> = db.collection("resume");
        Database {
            blogs: blogs_collection,
            projects: projects_collection,
            resumes: resumes_collection,
        }
    }
}
