use actix_web::{test, web, App, HttpResponse};
use be::{appstate::AppState, config::Config, db::Database};

#[actix_web::test]
async fn health_check() {
    let app = test::init_service(App::new().route(
        "/health",
        web::get().to(|| async { HttpResponse::Ok().body("Alive") }),
    ))
    .await;

    let req = test::TestRequest::get().uri("/health").to_request();
    let resp = test::call_service(&app, req).await;

    assert!(resp.status().is_success());
}
