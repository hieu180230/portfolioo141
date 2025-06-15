use std::sync::MutexGuard;
use mongodb::bson::{doc, oid::ObjectId};
use actix_web::{HttpResponse, Responder, web, web::Data};
use serde::{Deserialize, Serialize};
use futures_util::StreamExt;
use serde_json::json;

use crate::{appstate::AppState, blog_model::Blog, db::Database};

#[derive(Deserialize, Serialize, Clone)]
pub struct Project {
    pub _id: ObjectId,
    pub title: String,
    pub description: String,
    pub href: String,
}

pub async fn get_projects(data: Data<AppState>) -> impl Responder{
    let projects: MutexGuard<Database> = data.database.lock().unwrap();
    let mut cursor = projects.projects.find(doc!{}).await.unwrap();

    let mut vec_data: Vec<Project> = Vec::new();
    while let Some(document) = cursor.next().await {
        vec_data.push(document.expect("add document to vector error"));
    }

    HttpResponse::Ok().json(vec_data)
}

