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

interface IFormUpdateProps {
    id: string;
}

export const FormUpdate = ({ id }: IFormUpdateProps) => {
    const { getToken } = useApi();
    const onSubmitFormUpdate = async (dataBody: any) => {
        try {
            const token = getToken();
            await api.patch(`/contacts/${id}`, dataBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Contato Atualizado com Sucesso");
        } catch {
            toast.error("Ops. Algo deu errado");
        }
    };

    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmitFormUpdate)}>
            <VStack spacing={5}>
                <Flex flexDir={"column"} w={"full"}>
                    <FormLabel>Nome</FormLabel>

                    <InputGroup>
                        <InputLeftElement children={<BsPerson />} />
                        <Input
                            type="text"
                            placeholder="Your Name"
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
                </Flex>

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
            </VStack>
        </form>
    );
};
