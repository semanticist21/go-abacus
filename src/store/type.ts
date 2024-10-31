import dayjs from 'dayjs';
import {z} from 'zod';

export const makeRandomFileName = () =>
  `주산덧셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;

export const defaultFileNameRegex = /^주산덧셈뺄셈-\d{8}-\d{6}$/;

export const optionsSchema = z.object({
  file_name: z.string().default(makeRandomFileName()),

  title: z
    .string()
    .min(1, {
      message: '제목은 최소한 1자 이상 입력해야 합니다.',
    })
    .max(30, {
      message: '제목은 최대 30자까지 입력할 수 있습니다.',
    })
    .default('LEVEL 0'),
  subtitle: z
    .string()
    .min(1, {
      message: '부제목은 최소한 1자 이상 입력해야 합니다.',
    })
    .max(30, {
      message: '부제목은 최대 30자까지 입력할 수 있습니다.',
    })
    .default('주산 암산'),
  page_count: z
    .number()
    .min(1, {
      message: '생성할 페이지 수는 최소한 1페이지 이상 입력해야 합니다.',
    })
    .max(20, {
      message: '생성할 페이지 수는 최대 20페이지까지 입력할 수 있습니다.',
    })
    .default(5),
  solutions_per_page: z.number().min(1).default(15),
  number_counters_per_solution: z.number().min(1).default(10),

  solution_table_per_page: z.number().min(1).default(3),
  solution_count_per_table: z.number().min(1).default(5),

  digit: z
    .number()
    .min(1, {
      message: '자리 수는 최소한 1자리 이상 입력해야 합니다.',
    })
    .max(7, {
      message: '자리 수는 최대 7자리까지 입력할 수 있습니다.',
    })
    .default(2),
  include_minus: z.boolean().default(false),
  is_random_digit: z.boolean().default(false),
  min_original_digit_solution_count: z.number().min(1).max(10).default(3),

  include_comma: z.boolean().default(true),
});

export const initialOptions = optionsSchema.parse({});

export const solutionsSchema = z.object({
  numbers: z.array(z.number()),
  answer: z.number(),
});

export const ISolutions = z.object({
  solutions: z.array(solutionsSchema),
});

export type Options = z.infer<typeof optionsSchema>;
export type Solutions = z.infer<typeof solutionsSchema>;
export type ISolutions = z.infer<typeof ISolutions>;
