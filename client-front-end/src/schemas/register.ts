import * as yup from "yup";

export const RegisterSchema = yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    password: yup.string().required(),
});
