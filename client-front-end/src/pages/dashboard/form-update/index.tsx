import {
    Button,
    Flex,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
} from "@chakra-ui/react";
import { api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsPerson, BsPhone } from "react-icons/bs";
import { Error } from "../../../components/error";
import { MdOutlineEmail } from "react-icons/md";
import { PasswordField } from "../../../components/password-field";
import { styleInputMaskPhone } from "../../register";
import InputMask from "react-input-mask";
import { useApi } from "../../../context/api-context";
import { removeFalseValues } from "../../../utils/removeFalseValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateContactSchema } from "../../../schemas/contacts.schema";

interface IFormUpdateProps {
    id: string;
}

export const FormUpdate = ({ id }: IFormUpdateProps) => {
    const { getToken, setUser, updateContact, getClient } = useApi();
    const onSubmitFormUpdate = async (dataBody: any) => {
        try {
            const token = getToken();
            const body = removeFalseValues(dataBody);
            const contactUpdatedById = await updateContact(body, id, token);
            const clientFound = await getClient(
                contactUpdatedById.client.id,
                token
            );
            setUser(clientFound);
            toast.success("Contato Atualizado com Sucesso");
        } catch {
            toast.error("Ops. Algo deu errado");
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UpdateContactSchema),
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmitFormUpdate)}
            style={{ padding: 10 }}
        >
            <Flex flexDir={"column"} gap={7}>
                <Flex flexDir={"column"} w={"full"} gap={5}>
                    <Flex flexDir={"column"} w={"full"}>
                        <FormLabel>Nome</FormLabel>

                        <InputGroup>
                            <InputLeftElement children={<BsPerson />} />
                            <Input
                                type="text"
                                placeholder="Insira seu nome"
                                {...register("name")}
                            />
                        </InputGroup>
                    </Flex>

                    <Flex flexDir={"column"} w={"full"}>
                        <FormLabel>Email</FormLabel>

                        <InputGroup>
                            <InputLeftElement children={<MdOutlineEmail />} />
                            <Input
                                type="email"
                                placeholder="Insira seu email"
                                {...register("email")}
                            />
                        </InputGroup>
                    </Flex>

                    <Flex flexDir={"column"} w={"full"}>
                        <FormLabel>Senha</FormLabel>
                        <PasswordField {...register("password")} />
                    </Flex>

                    <Flex flexDir={"column"} w={"full"}>
                        <FormLabel>Celular</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<BsPhone />} />
                            <InputMask
                                {...register("phone")}
                                mask="(99) 99999-9999"
                                style={styleInputMaskPhone}
                                placeholder={"Insira seu número"}
                            />
                        </InputGroup>
                        {errors.phone && <Error text={errors.phone.message} />}
                    </Flex>
                </Flex>
                <Flex gap={10}>
                    <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        _hover={{
                            bg: "blue.500",
                        }}
                        type={"submit"}
                    >
                        Atualizar Contato
                    </Button>
                    <Button
                        bg="red.400"
                        color="white"
                        type={"button"}
                        onClick={() => console.log("OI")}
                    >
                        Remover Contato
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
