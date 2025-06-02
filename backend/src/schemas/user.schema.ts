import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha inválida"),
});

export type LoginUserDTO = z.infer<typeof loginUserSchema>;

export const UserResponseSchama = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type UserResponseDTO = z.infer<typeof UserResponseSchama>;

export const loginUserResponseSchama = z.object({
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
});

export type UserLoginResponseDTO = z.infer<typeof loginUserResponseSchama>;
