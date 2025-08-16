import {page_countSchema, subtitleSchema, titleSchema} from '@/types/schema';
import dayjs from 'dayjs';
import {z} from 'zod';

export const makeRandomFileName = () => `주산곱셈뺄셈-${dayjs().format('YYYYMMDD-HHmmss')}`;
export const defaultFileNameRegex = /^주산곱셈뺄셈-\d{8}-\d{6}$/;

export const optionsSchema = z.object({
  file_name: z.string().default(makeRandomFileName()),

  title: titleSchema,
  subtitle: subtitleSchema,
  page_count: page_countSchema,
});

export const initialOptions = optionsSchema.parse({});

export const solutionsSchema = z.object({
  numbers: z.array(z.number()),
  answer: z.number(),
});

export const iSolutionsSchema = z.object({
  solutions: z.array(solutionsSchema),
});

export type Options = z.output<typeof optionsSchema>;
export type Solutions = z.output<typeof solutionsSchema>;
export type ISolutions = z.output<typeof iSolutionsSchema>;
