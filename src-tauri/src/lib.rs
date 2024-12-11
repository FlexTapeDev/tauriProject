// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
#[warn(dead_code)]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn tauritestcommand(input: &str) -> String {
    format!("Hello, World! {}", input)
}

#[tauri::command]
async fn random_image(animal_type: String) -> Result<String, String> {
    let url = if animal_type == "cat" {
        "https://api.thecatapi.com/v1/images/search"
    } else {
        "https://dog.ceo/api/breeds/image/random"
    };

    let response = reqwest::get(url)
        .await
        .map_err(|e| e.to_string())?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())?;

    let image_url = if animal_type == "cat" {
        response[0]["url"].as_str().unwrap().to_string()
    } else {
        response["message"].as_str().unwrap().to_string()
    };

    Ok(image_url)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        //.invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![tauritestcommand])
        .invoke_handler(tauri::generate_handler![random_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
