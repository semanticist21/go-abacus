use serde::{Deserialize, Serialize};
use std::iter::{self, repeat_with};
use tauri::utils::config::parse::is_configuration_file;

#[derive(Deserialize)]
pub struct Options {
    page_count: u8,
    digit: u8,
    include_minus: bool,
    is_random_digit: bool,
    solutions_per_page: u8,
    number_counters_per_solution: u8,
}

#[derive(Serialize)]
pub struct Solution {
    number: Vec<i32>,
    answer: i32,
}

#[derive(Serialize)]
pub struct Solutions {
    solutions: Vec<Solution>,
}

#[tauri::command]
pub fn generate(options: Options) -> Solutions {
    let Options {
        page_count,
        digit,
        include_minus,
        is_random_digit,
        solutions_per_page,
        number_counters_per_solution,
    } = options;

    println!(
        "Received options: pageCount={}, digitCount={}, includeMinus={}, randomDigit={}",
        options.page_count, options.digit, options.include_minus, options.is_random_digit
    );

    let mut current_sum = 0;

    let solutions = (0..solutions_per_page).map(|i| {
        // (0..number_counters_per_solution).map(|i| {
        //     let is_first = i == 0;

        //     if is_first {
        //         current_sum = 0;
        //     }

        //     0
        // })

        // 1
    });

    Solutions { solutions: vec![] }
}
