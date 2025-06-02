import { z } from 'zod';
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  validatePasswordConfirmation,
} from '../schemas/userFieldSchemas';

export const SignupAuthSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    validatePasswordConfirmation(password, confirmPassword, ctx);
  });

export const LoginAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignupAuthDTO = z.infer<typeof SignupAuthSchema>;
export type LoginAuthDTO = z.infer<typeof LoginAuthSchema>;
