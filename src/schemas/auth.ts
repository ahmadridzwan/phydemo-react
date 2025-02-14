import { z } from 'zod';

const passwordRequirements = {
  minLength: 8,
  maxLength: 20,
};

export const authSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(
      passwordRequirements.minLength,
      `Password must be at least ${passwordRequirements.minLength} characters`,
    )
    .max(
      passwordRequirements.maxLength,
      `Password must not exceed ${passwordRequirements.maxLength} characters`,
    )
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

export type AuthFormData = z.infer<typeof authSchema>;

export const PASSWORD_REQUIREMENTS = [
  'At least 8 characters long',
  'Contains at least one uppercase letter',
  'Contains at least one lowercase letter',
  'Contains at least one number',
  'Contains at least one special character',
];
