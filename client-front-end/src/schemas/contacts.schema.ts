import * as yup from "yup";

export const CreateContactSchema = yup.object().shape({
    email: yup
        .string()
        .email("email precisa ser um campo válido")
        .required("email é obrigatório")
        .typeError("Por favor, insira um endereço de email válido"),
    name: yup.string().required("nome é obrigatório"),
    phone: yup
        .string()
        .required("O número de telefone é obrigatório.")
        .matches(
            /\([[0-9]{2}\)\s9[0-9]{4}\-[0-9]{4}/gm,
            "O padrão de celular não aceito."
        ),
});

export const UpdateContactSchema = yup.object().shape({
    email: yup
        .string()
        .email("email precisa ser um campo válido")
        .typeError("Por favor, insira um endereço de email válido"),
    name: yup.string(),
    phone: yup
        .string()
        .matches(
            /\([[0-9]{2}\)\s9[0-9]{4}\-[0-9]{4}/gm,
            "O padrão de celular não aceito."
        ),
});
