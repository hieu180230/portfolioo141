use std::time::SystemTime;
use chrono::Utc;
use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Blog {
    pub _id: ObjectId,
    pub title: String,
    pub content: String,
    pub created_at: String,
    pub author: String,
}


