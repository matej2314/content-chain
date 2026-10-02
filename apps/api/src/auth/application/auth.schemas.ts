import { z } from 'zod';

export const bootstrapAdminSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const updateMeEmailSchema = z
  .object({
    email: z.email(),
    currentPassword: z.string().min(1),
  })
  .strict();

export const registerUserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1),
  })
  .strict();

export const activateAccountSchema = z
  .object({
    token: z.string().min(1),
  })
  .strict();

export const resendActivationSchema = z
  .object({
    email: z.email(),
  })
  .strict();

export const patchUserSchema = z
  .object({
    isActive: z.literal(true),
  })
  .strict();

export type BootstrapAdminInput = z.infer<typeof bootstrapAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type ActivateAccountInput = z.infer<typeof activateAccountSchema>;
export type ResendActivationInput = z.infer<typeof resendActivationSchema>;
export type UpdateMeEmailInput = z.infer<typeof updateMeEmailSchema>;
export type PatchUserCommand = z.infer<typeof patchUserSchema>;
