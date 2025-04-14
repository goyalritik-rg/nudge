import { z } from "zod";

export const UserRegistrationSchema = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(1, { message: "Name is required" })
      .min(4, { message: "Your full name must be atleast 4 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "Password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "Password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
