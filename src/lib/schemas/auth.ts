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
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  // phoneNumber: Yup.string()
  //   .required("Phone number is required")
  //   .matches(/^(0[7-9][0-1]\d{8}|[7-9][0-1]\d{7})$/, "Invalid phone number"),
  skill: Yup.string().required("Skill is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

