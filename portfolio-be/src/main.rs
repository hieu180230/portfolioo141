use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::{Serialize, Deserialize};
use std::sync::{Mutex, MutexGuard};
use actix_web::web::{Data, ServiceConfig};

use chrono::{Utc, DateTime};
use mongodb::bson::doc;
use be::{blog_model::Blog, db::Database};

use futures_util::StreamExt;
use serde_json::json;

use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;


#[derive(Deserialize)]
struct CreateBlog {
    title: String,
    content: String,
    author: String,
}

#[derive(Deserialize)]
struct UpdateBlog {
    title: Option<String>,
    content: Option<String>,
    author: Option<String>,
}

struct AppState {
    blogs_list: Mutex<Database>,
}

impl AppState {
    async fn new(blog: Database) -> Self{
        AppState {
            blogs_list: Mutex::new(blog),
        }
    }
}

async fn get_blogs(data: Data<AppState>) -> impl Responder {
    let blogs: MutexGuard<Database> = data.blogs_list.lock().unwrap();
    let mut cursor = blogs.blogs.find(doc!{}).await.unwrap();
    let mut vec_data: Vec<Blog> = Vec::new();
    while let Some(document) = cursor.next().await {
        vec_data.push(document.expect("add document to vector error"));
    }
    HttpResponse::Ok().json(vec_data)
}


// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//
//     let database = Database::init().await;
//
//     let app_state  = web::Data::new(AppState{
//         blogs_list: Mutex::new(database),
//         });
//
//     HttpServer::new(move || {
//         let cors = Cors::default()
//             .allow_any_method()
//             .allow_any_origin()
//             .allow_any_header()
//             .max_age(3600);
//
//         App::new()
//             .app_data(app_state.clone())
//             .wrap(cors)
//             .route("/blog", web::get().to(get_blogs))
//     }).bind("127.0.0.1:8080").expect("failed").run().await
// }

#[shuttle_runtime::main]
async fn main(#[shuttle_runtime::Secrets] secrets: SecretStore,) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {

    let database = Database::init(secrets).await;

    let app_state  = web::Data::new(AppState{
        blogs_list: Mutex::new(database),
        });

    let config = move |cfg: &mut ServiceConfig| {
        // set up your service here, e.g.:
        cfg.app_data(app_state.clone());
        cfg.service(web::resource("blog")
            .route(web::get().to(get_blogs))
            .wrap(Cors::default()
                .allow_any_method()
                .allow_any_origin()
                .allow_any_header()
                .max_age(3600)
            )
        );
    };

    Ok(config.into())
}

