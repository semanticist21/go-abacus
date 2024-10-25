use rand::{random, Rng};
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
        .map(|_i| {
            let mut is_force_original_digit = false;
            let mut current_original_digit = 0;

            let questions = (0..number_counters_per_solution)
                .map(|i| {
                    let is_first: bool = i == 0;

                    if is_first {
                        current_sum = 0;
                    }

                    let remaining_count = number_counters_per_solution - i;

                    if remaining_count < min_original_digit_solution_count {
                        is_force_original_digit = true;
                    }

                    let mut _digit = digit;

                    if is_random_digit && !is_force_original_digit && !is_first {
                        let weights = (1..=digit).map(|x| x.pow(2)).collect::<Vec<u32>>();
                        let total_weight = weights.iter().sum::<u32>();

                        let mut random_value = rng.gen_range(0..=total_weight);

                        for (i, &weight) in weights.iter().enumerate() {
                            // if digit diff is greater than 3, skip the first digit.
                            if digit > 3 && i == 0 {
                                continue;
                            }

                            if random_value < weight {
                                _digit = i as u32 + 1;
                                break;
                            }

                            random_value -= weight;
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

                    let is_plus: bool = is_first || rng.gen_bool(0.5);
                    random_number = random_number * if is_plus { 1 } else { -1 };

                    // prevent zero
                    while current_sum + random_number == 0 || prev_num + random_number == 0 {
                        random_number =
                            rng.gen_range(min..=max) as i64 * if is_plus { 1 } else { -1 };
                    }

                    if current_sum + random_number < 0 {
                        random_number = random_number.abs();
                    }

                    current_sum += random_number;
                    prev_num = random_number;

                    random_number
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
