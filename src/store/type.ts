import dayjs from 'dayjs';
import {z} from 'zod';

export const makeRandomFileName = () =>
  `주산덧셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;

export const optionsSchema = z.object({
  file_name: z.string().default(makeRandomFileName()),

  title: z.string().default('LEVEL 0'),
  subtitle: z.string().default('주산 암산'),
  page_count: z.number().min(1).max(20).default(5),
  solutions_per_page: z.number().min(1).default(15),
  number_counters_per_solution: z.number().min(1).default(10),

  solution_table_per_page: z.number().min(1).default(3),
  solution_count_per_table: z.number().min(1).default(5),

  digit: z.number().min(1).max(6).default(4),
  include_minus: z.boolean().default(false),
  is_random_digit: z.boolean().default(false),
  min_original_digit: z.number().min(1).max(10).default(3),

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
