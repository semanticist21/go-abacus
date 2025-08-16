import {page_countSchema, subtitleSchema, titleSchema} from '@/types/schema';
import dayjs from 'dayjs';
import {z} from 'zod';

export const makeRandomFileName = () => `주산곱셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;
export const defaultFileNameRegex = /^주산곱셈뺄셈-\d{8}-\d{6}$/;

export const multiplyOptionsSchema = z.object({
  file_name: z.string().default(() => makeRandomFileName()),

  title: titleSchema,
  subtitle: subtitleSchema,
  page_count: page_countSchema,

  generation_mode: z.enum(['divide', 'multiply', 'mix']).default('mix'),

  // 나눗셈
  divide_digit: z.number().min(1).max(7).default(2),

  // 나눗셈 - 자리수 고정
  big_divide_min_digit: z.number().min(1).max(7).default(2),
  big_divide_max_digit: z.number().min(1).max(7).default(2),

  small_divide_min_digit: z.number().min(1).max(7).default(2),
  small_divide_max_digit: z.number().min(1).max(7).default(2),

  // 곱하기
  big_multiply_max_digit: z.number().min(1).max(7).default(2),
  big_multiply_min_digit: z.number().min(1).max(7).default(2),

  small_multiply_max_digit: z.number().min(1).max(7).default(2),
  small_multiply_min_digit: z.number().min(1).max(7).default(2),

  multiply_order: z.enum(['mix', 'large_first', 'small_first', 'swap']).default('mix'),

  // 기타 옵션
  exclude_easy: z.boolean().default(true),
});

export const initialOptions = multiplyOptionsSchema.parse({});

export const multiplySolutionsSchema = z.object({
  numbers: z.object({
    big_number: z.number(),
    small_number: z.number(),
    type: z.enum(['divide', 'multiply']),
  }),
  answer: z.number(),
});

export const iMultiplySolutionsSchema = z.object({
  solutions: z.array(multiplySolutionsSchema),
});

export type MultiplyOptions = z.output<typeof multiplyOptionsSchema>;
export type MultiplySolutions = z.output<typeof multiplySolutionsSchema>;
export type IMultiplySolutions = z.output<typeof iMultiplySolutionsSchema>;
