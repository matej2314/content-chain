import { z } from 'zod';

export const bootstrapAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const patchUserSchema = z
  .object({
    isActive: z.literal(true),
  })
  .strict();

export type BootstrapAdminInput = z.infer<typeof bootstrapAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PatchUserCommand = z.infer<typeof patchUserSchema>;
