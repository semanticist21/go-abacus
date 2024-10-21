use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Options {
    title: String,
    subtitle: String,
    page_count: u8,
    digit: u8,
    include_minus: bool,
    random_digit: bool,
}

#[derive(Serialize)]
pub struct NumbersWithAnswer {
    number: Vec<i32>,
    answer: i32,
}

#[tauri::command]
pub fn generate(options: Options) -> NumbersWithAnswer {
    println!(
        "Received options: title={}, subtitle={}, pageCount={}, digitCount={}, includeMinus={}, randomDigit={}",
        options.title, options.subtitle, options.page_count, options.digit, options.include_minus, options.random_digit
    );

    NumbersWithAnswer {
        number: vec![],
        answer: 0,
    }
}
