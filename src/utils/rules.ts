import * as zod from "zod";

const authValidation = {
  email: zod
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid")
    .max(160, "Maximum length is 160 characters"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Length from 8 to 160 characters")
    .max(160, "Length from 8 to 160 characters"),
  confirmPassword: zod
    .string()
    .min(1, "Confirm password is required")
    .min(8, "Length from 8 to 160 characters")
    .max(160, "Length from 8 to 160 characters"),
  fullName: zod.string().min(1, "Name is required").max(160, "Maximum length is 160 characters").trim(),
  phoneNumber: zod.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
    message: "Phone number is invalid",
  }),
};

export const loginSchema = zod.object({
  email: authValidation.email,
  password: authValidation.password,
});

export const registerSchema = zod
  .object({
    email: authValidation.email,
    password: authValidation.password,
    confirmPassword: authValidation.confirmPassword,
    fullName: authValidation.fullName,
    phoneNumber: authValidation.phoneNumber,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });

export type LoginSchema = zod.infer<typeof loginSchema>;
export type RegisterSchema = zod.infer<typeof registerSchema>;
