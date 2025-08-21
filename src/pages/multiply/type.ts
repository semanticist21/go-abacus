import dayjs from 'dayjs';
import {z} from 'zod';
import {page_countSchema, subtitleSchema, titleSchema} from '@/types/schema';

export const makeRandomFileName = () => `주산곱셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;
export const defaultFileNameRegex = /^주산곱셈뺄셈-\d{8}-\d{6}$/;

export const multiplyOptionsSchema = z.object({
  multiply_order: z.enum(['mix', 'large_first', 'small_first', 'swap']).default('mix'),

  generation_mode: z.enum(['divide', 'multiply', 'mix']).default('mix'),
  small_divide_max_digit: z.number().min(1).max(7).default(2),
  small_divide_min_digit: z.number().min(1).max(7).default(2),

  big_divide_max_digit: z.number().min(1).max(7).default(2),

  // 나눗셈 - 자리수 고정
  big_divide_min_digit: z.number().min(1).max(7).default(2),
  file_name: z.string().default(() => makeRandomFileName()),

  // 곱하기
  multiply_max_digit: z.number().min(1).max(7).default(2),
  multiply_min_digit: z.number().min(1).max(7).default(2),

  // 기타 옵션
  exclude_easy: z.boolean().default(true),
  page_count: page_countSchema,

  subtitle: subtitleSchema,

  title: titleSchema,
});

export const initialOptions = multiplyOptionsSchema.parse({});

export const multiplySolutionsSchema = z.object({
  numbers: z.object({
    type: z.enum(['divide', 'multiply']),
    small_number: z.number(),
    big_number: z.number(),
  }),
  answer: z.number(),
});

export const iMultiplySolutionsSchema = z.object({
  solutions: z.array(multiplySolutionsSchema),
});

export type IMultiplySolutions = z.output<typeof iMultiplySolutionsSchema>;
export type MultiplySolutions = z.output<typeof multiplySolutionsSchema>;
export type MultiplyOptions = z.output<typeof multiplyOptionsSchema>;
