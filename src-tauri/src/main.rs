// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, io::Read};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}! You've been greeted from Rust!", name)
}


#[tauri::command]
fn read_file(path: &str) -> String {
   match File::open(path) {
      Ok(mut in_file) => {
         let mut contents = String::new();
         match in_file.read_to_string(&mut contents) {
            Ok(_) => { return contents },
            Err(_) => { return "Failed to read!".into() }
         }
      },
      Err(err) => {
         return err.to_string();
      }
   }
}

fn main() {
   tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet, read_file])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
