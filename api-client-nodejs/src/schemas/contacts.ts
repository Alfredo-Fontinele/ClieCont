import * as yup from "yup";

export const createContactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
});

export const updateContactSchema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phone: yup.string().notRequired(),
    is_active: yup.boolean().notRequired(),
});
