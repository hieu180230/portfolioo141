use actix_web::{web, App, HttpResponse, HttpServer};
// use actix_cors::Cors;
// use serde::{Serialize, Deserialize};
// use std::sync::Mutex;
// use chrono::{Utc, DateTime};

use be::{
    appstate::AppState,
    blog_model::{get_blog_by_id, get_blogs},
    db::Database,
    project_model::get_projects,
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = match dotenv::var("PORT") {
        Ok(v) => v.to_string(),
        Err(_e) => "8000".to_string(),
    };
    let bind_address = format!("0.0.0.0:{}", port);
    let database = Database::init().await;

    let app_state = web::Data::new(AppState {
        database: database.into(),
    });

    HttpServer::new(move || {
        // let cors = Cors::default()
        //     .allow_any_method()
        //     .allow_any_origin()
        //     .allow_any_header()
        //     .max_age(3600);

        App::new()
            .app_data(app_state.clone())
            // .wrap(cors)
            .route("/blogs", web::get().to(get_blogs))
            .route("/blog", web::get().to(get_blog_by_id))
            .route("/projects", web::get().to(get_projects))
            .route(
                "/health",
                web::get().to(|| async { HttpResponse::Ok().body("Alive") }),
            )
    })
    .bind(&bind_address)
    .expect("failed")
    .run()
    .await
}
