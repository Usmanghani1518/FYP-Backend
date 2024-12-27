import * as yup from "yup";


export const signUpValidation = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "min 3 chars")
      .max(10, "max 10 chars"),
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email adress"),
    password: yup
      .string()
      .required("passowrd is required")
      .min(6, "min 6  chars of password")
      .max(10, "max 10 chars"),
  });

export const signInValidation = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email adress"),
    password: yup
      .string()
      .required("passowrd is required")
      .min(6, "min 6  chars of password")
  });