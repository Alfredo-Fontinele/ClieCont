import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup
        .string()
        .email("email precisa ser um campo válido")
        .typeError("Por favor, insira um endereço de email válido")
        .required("email é obrigatório"),
    password: yup.string().required("senha é obrigatório"),
});
