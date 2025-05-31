import { z } from 'zod';

const nameSchema = z.string().min(3, 'Name must be at least 3 characters long');
const emailSchema = z
  .string()
  .email('Invalid email')
  .transform((value) => value.toLowerCase());
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const SignupAuthSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const LoginAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignupAuthDTO = z.infer<typeof SignupAuthSchema>;
export type LoginAuthDTO = z.infer<typeof LoginAuthSchema>;
