import * as yup from "yup";
import { loginSchema } from "./loginValidation";


export const registerValidation = yup.object({
  fullName: yup.string().required('Поле обязательное'),
}).concat(loginSchema);

