use std::sync::MutexGuard;
use actix_web::{HttpResponse, Responder, web, web::Data};
use mongodb::bson::{oid::ObjectId, DateTime, doc};
use serde::{Deserialize, Serialize};
use futures_util::StreamExt;
use serde_json::json;

use crate::appstate::AppState;
use crate::db::Database;

#[derive(Serialize, Deserialize, Clone)]
pub struct Blog {
    pub _id: ObjectId,
    pub title: String,
    pub content: String,
    pub created_at: String,
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

pub async fn get_blogs(data: Data<AppState>) -> impl Responder {
    let blogs: MutexGuard<Database> = data.database.lock().unwrap();
    let mut cursor = blogs.blogs.find(doc!{}).await.unwrap();
    let mut vec_data: Vec<Blog> = Vec::new();
    while let Some(document) = cursor.next().await {
        vec_data.push(document.expect("add document to vector error"));
    }

    for blog in vec_data.iter_mut() {
        if (blog.tags.is_empty()) {
            blog.tags.push("#guest".to_string());
        }
        else if (blog.tags[0].is_empty()) {
            blog.tags[0] = "#guest".to_string();
        }
    }
    HttpResponse::Ok().json(vec_data)
}

pub async fn add_blog(data: Data<AppState>, blog: web::Json<AddBlog>) -> impl Responder {
    let blogs: MutexGuard<Database> = data.database.lock().unwrap();
    let new_blog = Blog{
        _id: ObjectId::new(),
        title: blog.title.clone(),
        content: blog.content.clone(),
        created_at: chrono::Local::now().format("%a %b %d %Y").to_string(),
        author: blog.author.clone(),
        tags: blog.tags.clone(),
    };
    let res = blogs.blogs.insert_one(new_blog).await;
    match res {
        Ok(T) => {
            let mut cursor = blogs.blogs.find(doc!{}).await.unwrap();
            let mut vec_data: Vec<Blog> = Vec::new();
            while let Some(document) = cursor.next().await {
                vec_data.push(document.expect("add document to vector error"));
            }
            return HttpResponse::Ok().json(vec_data)
        }
        Err(E) => {
            return HttpResponse::Ok().body(E.to_string());
        }
    }

}

