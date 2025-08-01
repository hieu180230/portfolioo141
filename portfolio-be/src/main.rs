use actix_web::{web, web::{Data, ServiceConfig}, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::{Serialize, Deserialize};
use std::sync::Mutex;
use chrono::{Utc, DateTime};

use shuttle_actix_web::ShuttleActixWeb;
use shuttle_runtime::SecretStore;

use be::{blog_model::{get_blogs, get_blog_by_id, add_blog},
         project_model::{get_projects},
         db::Database,
         appstate::AppState};





// #[actix_web::main]
// async fn main() -> std::io::Result<()> {
//
//     let database = Database::init().await;
//
//     let app_state  = web::Data::new(AppState{
//         database: Mutex::new(database),
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
        database: Mutex::new(database),
        });

    let config = move |cfg: &mut ServiceConfig| {
        // set up your service here, e.g.:
        cfg.app_data(app_state.clone());
        cfg.service(web::resource("blog/view")
            .route(web::get().to(get_blog_by_id))
            .wrap(Cors::default()
                .allow_any_method()
                .allow_any_origin()
                .allow_any_header()
                .max_age(3600)
            )
        ).service(web::resource("blog")
            .route(web::get().to(get_blogs))
            .route(web::get().to(get_blog_by_id))
            .route(web::post().to(add_blog))
            .wrap(Cors::default()
                .allow_any_method()
                .allow_any_origin()
                .allow_any_header()
                .max_age(3600)
            )
        ).service(web::resource("project")
            .route(web::get().to(get_projects))
            .wrap(Cors::default()
                .allow_any_method()
                .allow_any_origin()
                .allow_any_header()
                .max_age(3600)
            ));
    };

    Ok(config.into())
}

