import dayjs from 'dayjs';
import {z} from 'zod';
import {page_countSchema, subtitleSchema, titleSchema} from '@/types/schema';

export const makeRandomFileName = () => `주산덧셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;
export const defaultFileNameRegex = /^주산덧셈뺄셈-\d{8}-\d{6}$/;

export const optionsSchema = z.object({
  digit: z
    .number()
    .min(1, {
      message: '자리 수는 최소한 1자리 이상 입력해야 합니다.',
    })
    .max(7, {
      message: '자리 수는 최대 7자리까지 입력할 수 있습니다.',
    })
    .default(2),

  min_original_digit_solution_count: z.number().min(1).max(10).default(3),
  number_counters_per_solution: z.number().min(1).default(10),
  file_name: z.string().default(() => makeRandomFileName()),

  solution_count_per_table: z.number().min(1).default(5),
  solution_table_per_page: z.number().min(1).default(3),

  solutions_per_page: z.number().min(1).default(15),
  is_random_digit: z.boolean().default(false),

  include_minus: z.boolean().default(false),
  include_comma: z.boolean().default(true),
  is_decimal: z.boolean().default(false),
  page_count: page_countSchema,

  subtitle: subtitleSchema,
  title: titleSchema,
});

export const initialOptions = optionsSchema.parse({});

export const solutionsSchema = z.object({
  numbers: z.array(z.number()),
  answer: z.number(),
});

export const iSolutionsSchema = z.object({
  solutions: z.array(solutionsSchema),
});

export type ISolutions = z.output<typeof iSolutionsSchema>;
export type Solutions = z.output<typeof solutionsSchema>;
export type Options = z.output<typeof optionsSchema>;
