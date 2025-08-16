import z from 'zod';

export const titleSchema = z.string().min(1).max(30).default('LEVEL 0');
export const subtitleSchema = z.string().min(1).max(30).default('주산 암산');
export const page_countSchema = z.number().min(1).max(100).default(5);
