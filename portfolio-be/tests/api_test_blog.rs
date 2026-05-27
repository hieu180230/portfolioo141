use actix_web::{test, web, App, HttpResponse};
use be::{
    appstate::AppState,
    blog_model::{bson_datetime_as_iso::serialize, get_blog_by_id, get_blogs, Blog},
    config::Config,
    db::Database,
};
use mongodb::bson::{oid::ObjectId, DateTime};
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
    let mut database = Database::from_uri(&test_uri).await;

    let mock_id = ObjectId::new();

    let mock_blog = Blog {
        _id: mock_id,
        title: "testing title".to_string(),
        content: "testing content".to_string(),
        created_at: DateTime::now(),
        author: "testing author".to_string(),
        tags: vec!["#testing".to_string()],
    };

    database
        .blogs
        .insert_one(&mock_blog)
        .await
        .expect("Failed inserting mock data!");

    let app_state = web::Data::new(AppState { config, database });
    let app = test::init_service(
        App::new()
            .app_data(app_state.clone())
            .route("/blogs", web::get().to(get_blogs))
            .route("/blog", web::get().to(get_blog_by_id)),
    )
    .await;

    let req = test::TestRequest::get().uri("/blogs").to_request();
    let resp = test::call_service(&app, req).await;

    let body_bytes = test::read_body(
        test::call_service(&app, test::TestRequest::get().uri("/blogs").to_request()).await,
    )
    .await;
    println!("{}", std::str::from_utf8(&body_bytes).unwrap());
    assert!(resp.status().is_success());
    let blogs_response: Vec<Blog> = test::read_body_json(resp).await;
    assert_eq!(blogs_response.len(), 1);
    let fetched_blog = &blogs_response[0];
    assert_eq!(fetched_blog.title, "testing title");
}
