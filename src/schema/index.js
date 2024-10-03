import { z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, {
      message: "Name should contain only alphabets",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email format" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .refine((value) => /^.{6,}$/.test(value), {
      message: "Password must be at least 6 characters long",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[@$!%*?&]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email format" }),
});
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .refine((value) => /^.{6,}$/.test(value), {
      message: "Password must be at least 6 characters long",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[@$!%*?&]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});
