import { AnyZodObject } from 'zod';

export interface RequestValidators {
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject,
}