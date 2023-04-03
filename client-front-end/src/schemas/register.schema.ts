import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
    email: yup
        .string()
        .email("email precisa ser um campo válido")
        .required("email é obrigatório"),
    password: yup
        .string()
        .required("Senha obrigatória")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/,
            "Senha com no mínimo 8 caracteres. Necessário ter letras, números e ao menos um símbolo"
        ),
    name: yup.string().required("nome é obrigatório"),
    phone: yup
        .string()
        .required("O número de telefone é obrigatório.")
        .matches(
            /\([[0-9]{2}\)\s9[0-9]{4}\-[0-9]{4}/gm,
            "O padrão de celular não aceito."
        ),
});
