import { ILogin } from "@/interfaces/ILogin";
import * as yup from "yup";

export const loginSchema = yup.object<ILogin>().shape({
  email: yup.string().required("Email is required").email("Email Invalid!"),
  password: yup.string().required("Password is required"),
});
