import {
    Button,
    Flex,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsPerson, BsPhone } from "react-icons/bs";
import { Error } from "../../../components/error";
import { MdOutlineEmail } from "react-icons/md";
import { styleInputMaskPhone } from "../../register";
import InputMask from "react-input-mask";
import { useApi } from "../../../context/api-context";
import { removeFalseValues } from "../../../utils/removeFalseValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateContactSchema } from "../../../schemas/contacts.schema";
import { useState } from "react";
import { IContactCreateRequest } from "../../../interfaces/contacts";

interface IFormAddProps {
    onClose: () => void;
}

export const FormAdd = ({ onClose }: IFormAddProps) => {
    const { getToken, setUser, createContact, getClient, setContacts } =
        useApi();
    const token = getToken();

    const onSubmitFormAdd = async (dataBody: {}) => {
        try {
            const body: IContactCreateRequest = removeFalseValues(dataBody);
            const createContactReq = await createContact(body, token);
            const clientFound = await getClient(
                createContactReq.client.id,
                token
            );
            setUser(clientFound);
            toast.success("Contato Atualizado com Sucesso");
            onClose();
        } catch {
            toast.error("Ops. Verifique se esse contato já existe");
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CreateContactSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmitFormAdd)} style={{ padding: 10 }}>
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
                        {errors.name && <Error text={errors.name.message} />}
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
                        {errors.email && <Error text={errors.email.message} />}
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
                <Flex justifyContent={"center"} gap={10}>
                    <Button
                        colorScheme="green"
                        bg="green.400"
                        color="white"
                        _hover={{
                            bg: "green.500",
                        }}
                        type={"submit"}
                    >
                        Criar Contato
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
