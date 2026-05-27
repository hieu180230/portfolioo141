use actix_web::{test, web, App, HttpResponse};
use be::{
    appstate::AppState,
    config::Config,
    db::Database,
    project_model::{get_projects, Project},
};
use testcontainers::{runners::AsyncRunner, ContainerAsync};
use testcontainers_modules::mongo::Mongo;

#[actix_web::test]
async fn blogs_check() {
    let node: ContainerAsync<Mongo> = Mongo::default()
        .start()
        .await
        .expect("failed to start mongo container");
    let host_port = node.get_host_port_ipv4(27017).await.unwrap();
    let test_uri = format!("mongodb://127.0.0.1:{}", host_port);

    let config = Config::from_env().expect("invalid environment configuration");
    let database = Database::from_uri(&test_uri).await;
    let app_state = web::Data::new(AppState { config, database });
    let app = test::init_service(
        App::new()
            .app_data(app_state.clone())
            .route("/projects", web::get().to(get_projects)),
    )
    .await;

    let req = test::TestRequest::get().uri("/projects").to_request();
    let resp = test::call_service(&app, req).await;

    assert!(resp.status().is_success());
    // let resume_response: Vec<Project> = test::read_body_json(resp).await;
    // assert!(!resume_response.is_empty());
}
