use crate::{appstate::AppState, db::Database};
use actix_web::{web::Data, HttpResponse, Responder};
use futures_util::StreamExt;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};
use std::sync::MutexGuard;

//About
#[derive(Deserialize, Serialize, Clone)]
pub struct Info {
    field_name: String,
    field_value: String,
}
#[derive(Deserialize, Serialize, Clone)]
pub struct About {
    pub title: String,
    pub description: String,
    pub info: Vec<Info>,
}

//Experience
#[derive(Deserialize, Serialize, Clone)]
pub struct Exp {
    pub company: String,
    pub position: String,
    pub duration: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Experience {
    pub icon: String,
    pub title: String,
    pub description: String,
    pub exp: Vec<Exp>,
}

//Education
#[derive(Deserialize, Serialize, Clone)]
pub struct Edu {
    pub institution: String,
    pub degree: String,
    pub duration: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Education {
    pub icon: String,
    pub title: String,
    pub description: String,
    pub edu: Vec<Edu>,
}

//Skills
#[derive(Deserialize, Serialize, Clone)]
pub struct Skill {
    pub name: String,
    pub icon_slug: String,
    pub color: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Skills {
    pub title: String,
    pub description: String,
    pub skill: Vec<Skill>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Resume {
    pub _id: ObjectId,
    pub about: About,
    pub experience: Experience,
    pub education: Education,
    pub skills: Skills,
}

pub async fn get_resumes(data: Data<AppState>) -> impl Responder {
    let resumes: MutexGuard<Database> = data.database.lock().unwrap();
    let mut cursor = resumes.resumes.find(doc! {}).await.unwrap();

    let mut vec_data: Vec<Resume> = Vec::new();
    while let Some(document) = cursor.next().await {
        vec_data.push(document.expect("add document to vector error"));
    }

    HttpResponse::Ok().json(vec_data)
}
