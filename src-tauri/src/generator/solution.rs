use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Options {
    page_count: u16,
    digit: u32,
    include_minus: bool,
    is_random_digit: bool,
    solutions_per_page: u16,
    number_counters_per_solution: u16,
    min_original_digit_solution_count: u16,
}

#[derive(Serialize)]
pub struct Solution {
    numbers: Vec<i64>,
    answer: f64,
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
        min_original_digit_solution_count,
    } = options;

    println!(
        "Received options: pageCount={}, digitCount={}, includeMinus={}, randomDigit={}, solutionsPerPage={}, numberCountersPerSolution={}, minOriginalDigit={}",
        options.page_count, options.digit, options.include_minus, options.is_random_digit, options.solutions_per_page, options.number_counters_per_solution, options.min_original_digit_solution_count
    );

    let mut current_sum = 0;
    let mut rng = rand::thread_rng();

    let mut prev_num = 0;

    let solutions = (0..solutions_per_page * page_count)
        .map(|i| {
            let mut is_force_original_digit = false;
            let mut current_original_digit = 0;

            let questions = (0..number_counters_per_solution)
                .map(|j| {
                    let is_first: bool = j == 0;

                    if is_first {
                        current_sum = 0;
                    }

                    let remaining_count = number_counters_per_solution - j;

                    if remaining_count < min_original_digit_solution_count {
                        is_force_original_digit = true;
                    }

                    let mut _digit = digit;

                    if is_random_digit && !is_force_original_digit && !is_first {
                        let weights = (1..=digit).map(|x| x * 3).collect::<Vec<u32>>();
                        let total_weight = weights.iter().sum::<u32>();

                        let mut random_value = rng.gen_range(0..=total_weight);

                        for (i, &weight) in weights.iter().enumerate() {
                            // digit 3 > only 2,3
                            // digit 4 > only 2,3,4
                            // ...
                            if digit == 3 && i == 0 {
                                continue;
                            }

                            let is_big_digit = digit > 3;
                            let gap = digit - 3;

                            if is_big_digit && (i as u32) < gap {
                                continue;
                            }

                            if random_value < weight {
                                _digit = i as u32 + 1;
                                break;
                            }

                            let new_random_value = (random_value as i64 - weight as i64);

                            if new_random_value < 0 {
                                random_value = 0;
                                continue;
                            }

                            random_value = new_random_value as u32;
                        }
                    }

                    if _digit == digit {
                        current_original_digit += 1;
                    }

                    let min = 10_u64.pow(_digit - 1);
                    let max = 10_u64.pow(_digit) - 1;

                    let mut random_number: i64 = rng.gen_range(min..=max) as i64;

                    if !include_minus {
                        return random_number;
                    }

                    let is_only_positive_turns = i % 2 == 0;
                    let should_positive: bool =
                        is_first || is_only_positive_turns || rng.gen_bool(0.5);

                    random_number = random_number * if should_positive { 1 } else { -1 };

                    // prevent zero
                    while current_sum + random_number == 0 || prev_num + random_number == 0 {
                        random_number =
                            rng.gen_range(min..=max) as i64 * if should_positive { 1 } else { -1 };
                    }

                    if current_sum + random_number < 0 {
                        random_number = random_number.abs();
                    }

                    current_sum += random_number;
                    prev_num = random_number;

                    random_number
                })
                .collect::<Vec<i64>>();

            let answer = questions.iter().map(|x| *x as f64).sum::<f64>();

            Solution {
                numbers: questions,
                answer,
            }
        })
        .collect::<Vec<Solution>>();

    Solutions { solutions }
}
