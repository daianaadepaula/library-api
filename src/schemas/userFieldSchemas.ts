import { z } from 'zod';
import { ZodIssueCode, RefinementCtx } from 'zod';

export const nameSchema = z.string().min(3, 'Name must be at least 3 characters long');

export const emailSchema = z
  .string()
  .email('Invalid email')
  .transform((val) => val.toLowerCase().trim());

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export function validatePasswordConfirmation(
  password: string | undefined,
  confirmPassword: string | undefined,
  ctx: RefinementCtx,
) {
  if (password && !confirmPassword) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Please confirm your password',
      path: ['confirmPassword'],
    });
  }

  if (password && confirmPassword && password !== confirmPassword) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
}
