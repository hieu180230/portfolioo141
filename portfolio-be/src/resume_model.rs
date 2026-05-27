use crate::{appstate::AppState, db::Database};
use actix_web::{web::Data, HttpResponse};
use futures_util::TryStreamExt;
use mongodb::bson::{doc, oid::ObjectId};
use serde::{Deserialize, Serialize};
// use std::sync::MutexGuard;

use crate::error::AppError;

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

pub async fn get_resumes(data: Data<AppState>) -> Result<HttpResponse, AppError> {
    let resumes: &Database = &data.database;
    let cursor = resumes.resumes.find(doc! {}).await?;

    let vec_data: Vec<Resume> = cursor.try_collect().await?;

    Ok(HttpResponse::Ok().json(vec_data))
}
