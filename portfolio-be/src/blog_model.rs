use actix_web::{web, web::Data, HttpResponse};
use futures_util::TryStreamExt;
use mongodb::bson::{doc, oid::ObjectId, DateTime};
use serde::{Deserialize, Serialize, Serializer};

use crate::appstate::AppState;
use crate::db::Database;
use crate::error::AppError;

pub mod bson_datetime_as_iso {
    use super::*;

    pub fn serialize<S>(date: &DateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let iso_string = date.to_chrono().to_rfc3339();
        serializer.serialize_str(&iso_string)
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Blog {
    pub _id: ObjectId,
    pub title: String,
    pub content: String,
    // #[serde(serialize_with = "bson_datetime_as_iso::serialize")]
    pub created_at: DateTime,
    pub author: String,
    pub tags: Vec<String>,
}

#[derive(Deserialize, Clone)]
pub struct AddBlog {
    pub title: String,
    pub content: String,
    pub author: String,
    pub tags: Vec<String>,
}

#[derive(Deserialize)]
pub struct BlogID {
    pub id: String,
}

pub async fn get_blogs(data: Data<AppState>) -> Result<HttpResponse, AppError> {
    let blogs: &Database = &data.database;
    let cursor = blogs.blogs.find(doc! {}).await?;
    let mut vec_data: Vec<Blog> = cursor.try_collect().await?;

    for blog in vec_data.iter_mut() {
        if blog.tags.is_empty() {
            blog.tags.push("#guest".to_string());
        } else if blog.tags[0].is_empty() {
            blog.tags[0] = "#guest".to_string();
        }
    }
    Ok(HttpResponse::Ok().json(vec_data))
}

pub async fn get_blog_by_id(
    data: Data<AppState>,
    query: web::Query<BlogID>,
) -> Result<HttpResponse, AppError> {
    let blogs: &Database = &data.database;
    let id = ObjectId::parse_str(&query.id)
        .map_err(|e| AppError::Validation(format!("Invalid ID format: {}", e)))?;
    let document = blogs.blogs.find_one(doc! {"_id": id}).await?;

    match document {
        Some(doc) => Ok(HttpResponse::Ok().json(doc)),
        None => Err(AppError::NotFound),
    }
}

// pub async fn add_blog(data: Data<AppState>, blog: web::Json<AddBlog>) -> impl Responder {
//     let blogs: MutexGuard<Database> = data.database.lock().unwrap();
//     let new_blog = Blog{
//         _id: ObjectId::new(),
//         title: blog.title.clone(),
//         content: blog.content.clone(),
//         created_at: chrono::Local::now().format("%a %b %d %Y").to_string(),
//         author: blog.author.clone(),
//         tags: blog.tags.clone(),
//     };
//     let res = blogs.blogs.insert_one(new_blog).await;
//     match res {
//         Ok(t) => {
//             let mut cursor = blogs.blogs.find(doc!{}).await.unwrap();
//             let mut vec_data: Vec<Blog> = Vec::new();
//             while let Some(document) = cursor.next().await {
//                 vec_data.push(document.expect("add document to vector error"));
//             }
//             HttpResponse::Ok().json(vec_data)
//         }
//         Err(e) => {
//             HttpResponse::Ok().body(e.to_string())
//         }
//     }

// }
