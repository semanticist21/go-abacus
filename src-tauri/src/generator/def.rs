use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Options {
    page_count: u8,
    digit: u32,
    include_minus: bool,
    is_random_digit: bool,
    solutions_per_page: u8,
    number_counters_per_solution: u8,
}

#[derive(Serialize)]
pub struct Solution {
    numbers: Vec<i64>,
    answer: i64,
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
    let mut rng = rand::thread_rng();

    let solutions = (0..solutions_per_page * page_count)
        .map(|_i| {
            let questions = (0..number_counters_per_solution)
                .map(|i| {
                    let is_first: bool = i == 0;

                    if is_first {
                        current_sum = 0;
                    }

                    let mut _digit = digit;

                    if is_random_digit {
                        _digit = rng.gen_range(1..=digit);
                    }

                    let min = 10_u64.pow(_digit - 1);
                    let max = 10_u64.pow(_digit) - 1;

                    let mut random_number: i64 = rng.gen_range(min..=max) as i64;

                    if !include_minus {
                        return random_number;
                    }

                    let is_plus: bool = is_first || rng.gen_bool(0.5);

                    random_number = random_number * if is_plus { 1 } else { -1 };

                    let estimated_sum = current_sum + random_number;

                    if estimated_sum < 0 {
                        random_number.abs()
                    } else {
                        random_number
                    }
                })
                .collect::<Vec<i64>>();

            let answer = questions.iter().sum::<i64>();

            Solution {
                numbers: questions,
                answer,
            }
        })
        .collect::<Vec<Solution>>();

    Solutions { solutions }
}
