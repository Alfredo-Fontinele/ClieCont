import * as yup from "yup";

export const registerClientSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().min(15).required(),
});

export const loginClientSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const updateClientSchema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    is_active: yup.boolean().notRequired(),
});

export const getTokenSchema = yup.object().shape({
    token: yup.string().required(),
});
