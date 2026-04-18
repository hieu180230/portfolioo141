use actix_web::{web, web::Data, HttpResponse, Responder};
use futures_util::StreamExt;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::MutexGuard;

use crate::appstate::AppState;
use crate::db::Database;

#[derive(Serialize, Deserialize, Clone, Debug)]
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

#[derive(Deserialize)]
pub struct BlogID {
    pub id: String,
}

pub async fn get_blogs(data: Data<AppState>) -> impl Responder {
    let blogs: MutexGuard<Database> = data.database.lock().unwrap();
    let mut cursor = blogs.blogs.find(doc! {}).await.unwrap();
    let mut vec_data: Vec<Blog> = Vec::new();
    while let Some(document) = cursor.next().await {
        vec_data.push(document.expect("add document to vector error"));
    }

    for blog in vec_data.iter_mut() {
        if blog.tags.is_empty() {
            blog.tags.push("#guest".to_string());
        } else if blog.tags[0].is_empty() {
            blog.tags[0] = "#guest".to_string();
        }
    }
    HttpResponse::Ok().json(vec_data)
}

pub async fn get_blog_by_id(data: Data<AppState>, query: web::Query<BlogID>) -> impl Responder {
    let blogs: MutexGuard<Database> = data.database.lock().unwrap();
    let id = ObjectId::parse_str(query.id.clone());
    println!("id: {:?}", id);
    match id {
        Ok(t) => {
            let cursor = blogs.blogs.find_one(doc! {"_id": t}).await;
            match cursor {
                Ok(document) => {
                    if document.is_some() {
                        HttpResponse::Ok().json(document)
                    } else {
                        HttpResponse::Ok().json("None")
                    }
                }
                Err(e) => HttpResponse::Ok().json(format!("{e}")),
            }
        }
        Err(e) => HttpResponse::Ok().json(format!("{e}")),
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
