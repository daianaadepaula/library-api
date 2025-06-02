import { z } from 'zod';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  validatePasswordConfirmation,
} from '../schemas/userFieldSchemas';

export const createUserSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    validatePasswordConfirmation(password, confirmPassword, ctx);
  });

export const updateUserSchema = z
  .object({
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    confirmPassword: passwordSchema.optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    validatePasswordConfirmation(password, confirmPassword, ctx);
  });

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
