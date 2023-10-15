// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use base64::{engine::general_purpose, Engine as _};
use dotenv::dotenv;
use reqwest::blocking::Client;
use tauri::{Window, SystemTray};
use tauri_plugin_oauth::{start_with_config, OauthConfig};

#[tauri::command]
async fn start_server(window: Window) -> Result<u16, String> {
    let server = start_with_config(
        OauthConfig {
            ports: Some(vec![4269]),
            response: None,
        },
        move |url| {
            // Because of the unprotected localhost port, you must verify the URL here.
            // Preferebly send back only the token, or nothing at all if you can handle everything else in Rust.
            let code = url.split('=').collect::<Vec<&str>>()[1];
            println!("Code: {}", code);
            let token = get_token(code);
            println!("Token: {}\nRefresh: {}", token.0, token.1);
            let _ = window.emit("redirect_uri", (token.0, token.1));
        },
    )
    .map_err(|err| err.to_string());
    server
}

fn get_token(code: &str) -> (String, String) {
  dotenv().ok();
  let client_id = std::env::var("CLIENT_ID").expect("Error: CLIENT_ID must be set");
  let client_secret = std::env::var("CLIENT_SECRET").expect("Error: CLIENT_SECRET must be set");
  let client = Client::new();
  let params = [
      ("grant_type", "authorization_code"),
      ("code", code),
      ("redirect_uri", "http://localhost:4269/"),
  ];
  let response = client
      .post("https://accounts.spotify.com/api/token")
      .form(&params)
      .header(
          "Authorization",
          format!(
              "Basic {}",
              general_purpose::STANDARD.encode(format!("{}:{}", client_id, client_secret))
          ),
      )
      .send()
      .unwrap()
      .text()
      .unwrap();
  let access_token = serde_json::from_str::<serde_json::Value>(&response)
      .unwrap()
      .get("access_token")
      .unwrap()
      .as_str()
      .unwrap()
      .to_string();
  let refresh_token = serde_json::from_str::<serde_json::Value>(&response)
      .unwrap()
      .get("refresh_token")
      .unwrap()
      .as_str()
      .unwrap()
      .to_string();
  (access_token, refresh_token)
}

#[tauri::command]
fn get_new_token(refresh_token: &str) -> String {
    dotenv().ok();
    let client_id = std::env::var("CLIENT_ID").expect("Error: CLIENT_ID must be set");
    let client_secret = std::env::var("CLIENT_SECRET").expect("Error: CLIENT_SECRET must be set");
    let client = Client::new();
    let params = [
        ("grant_type", "refresh_token"),
        ("refresh_token", refresh_token),
    ];
    let response = client
        .post("https://accounts.spotify.com/api/token")
        .form(&params)
        .header(
            "Authorization",
            format!(
                "Basic {}",
                general_purpose::STANDARD.encode(format!("{}:{}", client_id, client_secret))
            ),
        )
        .send()
        .unwrap()
        .text()
        .unwrap();
    let token = serde_json::from_str::<serde_json::Value>(&response)
        .unwrap()
        .get("access_token")
        .unwrap()
        .to_string();
    token
}

#[tauri::command]
fn get_client_id() -> String {
    dotenv().ok();
    std::env::var("CLIENT_ID").expect("Error: CLIENT_ID must be set")
}

#[tauri::command]
// accepts a string from the frontend and returns an array buffer after downloading the image
fn get_img_data(src: String) -> Result<Vec<u8>, String> {
    let response = reqwest::blocking::get(src);
    match response {
        Ok(response) => {
            if response.status().is_success() {
                let mut buffer: Vec<u8> = Vec::new();
                let bytes = response.bytes();

                match bytes {
                    Ok(bytes) => {
                        buffer.extend_from_slice(&bytes);
                        Ok(buffer)
                    }
                    Err(err) => {
                        Err(format!("Error reading response bytes: {}", err))
                    }
                }
            } else {
                Err("Error: Image not found".to_string())
            }
        }
        Err(err) => {
            Err(format!("Error making HTTP request: {}", err))
        }
    }
}
fn main() {
  let tray = SystemTray::new();
  tauri::Builder::default()
  .system_tray(tray)
    .invoke_handler(tauri::generate_handler![
      start_server,
      get_client_id,
      get_new_token,
      get_img_data
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}