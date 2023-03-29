import {
    Button,
    Flex,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsPerson, BsPhone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { styleInputMaskPhone } from "../../register";
import InputMask from "react-input-mask";
import { useApi } from "../../../context/api-context";
import { removeFalseValues } from "../../../utils/removeFalseValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateContactSchema } from "../../../schemas/contacts.schema";
import { IDataHandleSubmit } from "../../../interfaces/others";

interface IFormUpdateProps {
    id: string;
    onClose: () => void;
}

interface IDataBody {
    name: string;
    email: string;
    phone: string;
}

export const FormUpdate = ({ id, onClose }: IFormUpdateProps) => {
    const {
        getToken,
        setUser,
        updateContact,
        getClient,
        currentContact,
        setContacts,
    } = useApi();

    const token = getToken();

    const onSubmitFormUpdate = async (dataBody: IDataHandleSubmit) => {
        try {
            const body: IDataBody = removeFalseValues(dataBody);
            const contactUpdatedById = await updateContact(body, id, token);
            const clientFound = await getClient(
                contactUpdatedById.client.id,
                token
            );
            setUser(clientFound);
            toast.success("Contato Atualizado com Sucesso");
            onClose();
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
                                defaultValue={currentContact?.name}
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
                                defaultValue={currentContact?.email}
                                placeholder="Insira seu email"
                                {...register("email")}
                            />
                        </InputGroup>
                    </Flex>

                    <Flex flexDir={"column"} w={"full"}>
                        <FormLabel>Celular</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<BsPhone />} />
                            <InputMask
                                defaultValue={currentContact?.phone}
                                {...register("phone")}
                                mask="(99) 99999-9999"
                                style={styleInputMaskPhone}
                                placeholder={"Insira seu número"}
                            />
                        </InputGroup>
                    </Flex>
                </Flex>
                <Flex justifyContent={"center"} gap={10}>
                    <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        _hover={{
                            bg: "blue.500",
                        }}
                        type={"submit"}
                    >
                        Atualizar
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
