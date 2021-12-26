import * as yup from "yup";


export const loginSchema = yup.object({
  email: yup.string().email('Неверная почта').required('Поле обязательное'),
  password: yup.string().min(6, 'Длина пароля должна быть больше 6 символов').required('Поле обязательное'),
});

