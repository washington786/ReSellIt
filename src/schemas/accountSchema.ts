import * as yup from "yup";

export const accountCreateSchema = yup.object().shape({
  fullname: yup.string().required("Name is required").min(3, "Invalid name!"),
  email: yup.string().required("Email is required!").email("Email is invalid!"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "password too short"),
});
