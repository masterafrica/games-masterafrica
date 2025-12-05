import * as Yup from "yup";

export const loginSchema = Yup.object({
  identifier: Yup.string()
    .required("Email or username is required")
    .min(3, "Must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+234|234|0)?[7-9][0-1]\d{8}$/, "Invalid phone number format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  skill: Yup.string().optional(),
  skillGroup: Yup.string().optional(),
});

export const forgotPasswordSchema = Yup.object({
  identifier: Yup.string()
    .required("Email, username, or phone number is required")
    .min(3, "Must be at least 3 characters"),
});

export const resetPasswordSchema = Yup.object({
  code: Yup.string()
    .required("OTP code is required")
    .matches(/^\d{4}$/, "OTP code must be 4 digits"),
  identifier: Yup.string()
    .required("Email, username, or phone number is required")
    .min(3, "Must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

