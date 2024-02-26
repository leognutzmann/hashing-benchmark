use axum::{routing::post, Json, Router};
use rand::Rng;
use serde::{Deserialize, Serialize};
use sha256::digest;
use std::time::{SystemTime, UNIX_EPOCH};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", post(create_hash));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn create_hash(Json(payload): Json<Vec<Data>>) -> String {
    let stringified_json = serde_json::to_string(&payload).unwrap();
    let random_number = rand::thread_rng().gen_range(
        0..SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_millis(),
    );

    digest(format!("{}-{}", stringified_json, random_number))
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub id: i64,
    pub name: String,
    pub city: String,
    pub age: i64,
    pub friends: Vec<Friend>,
}

#[derive(Serialize, Deserialize)]
pub struct Friend {
    pub name: String,
    pub hobbies: Vec<String>,
}
