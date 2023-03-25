import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup.string().email().required("email é obrigatório"),
    password: yup.string().required("senha é obrigatório"),
});
