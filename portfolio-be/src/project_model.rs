use actix_web::{web::Data, HttpResponse};
use futures_util::TryStreamExt;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};
// use std::sync::MutexGuard;
// use serde_json::json;

use crate::error::AppError;
use crate::{appstate::AppState, db::Database};

#[derive(Deserialize, Serialize, Clone)]
pub struct Project {
    pub _id: ObjectId,
    pub title: String,
    pub description: String,
    pub href: String,
    pub img_url: String,
}

pub async fn get_projects(data: Data<AppState>) -> Result<HttpResponse, AppError> {
    let projects: &Database = &data.database;
    let cursor = projects.projects.find(doc! {}).await?;

    let vec_data: Vec<Project> = cursor.try_collect().await?;

    Ok(HttpResponse::Ok().json(vec_data))
}
