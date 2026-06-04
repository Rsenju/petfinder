import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email e obrigatorio").email("Email invalido"),
  password: z.string().min(1, "Senha e obrigatoria").min(6, "Senha deve ter no minimo 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no minimo 3 caracteres"),
  email: z.string().email("Email invalido"),
  password: z.string().min(8, "Senha deve ter no minimo 8 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas nao conferem",
  path: ["confirmPassword"],
});
