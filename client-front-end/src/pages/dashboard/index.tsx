import {
    Button,
    Container,
    Flex,
    List,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Contact } from "../../../../api-client-nodejs/src/entities/Contact";
import { CardContactItem } from "./card-contact-item/index";
import { useApi } from "../../context/api-context";
import { useState, useEffect, useCallback } from "react";
import { FormUpdate } from "./form-update";
import { AddIcon } from "@chakra-ui/icons";
import { Colors } from "../../styles/colors";

export const Dashboard = () => {
    const {
        navigate,
        getUserByTokenCookie,
        getToken,
        setUser,
        user,
        currentContact,
    } = useApi();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const setClientContacts = useCallback(async () => {
        const user = await getUserByTokenCookie();
        setContacts(user.contacts);
    }, [contacts]);

    useEffect(() => {
        (async () => {
            await getUserByTokenCookie()
                .then((user) => setUser(user))
                .catch(() => navigate("/login"));
        })();
    }, []);

    useEffect(() => {
        setClientContacts();
    }, [user]);

    return (
        <Container w={"full"} maxW={"8xl"} minH={"100vh"}>
            <Flex w={"full"} p={6} flexDir={"column"} gap={10}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontWeight={500} fontSize={30}>
                        Olá, {user?.name}
                    </Text>
                    <Flex>
                        <AddIcon
                            fontSize={50}
                            p={4}
                            cursor={"pointer"}
                            border={`1px solid ${Colors.main}`}
                            _hover={{
                                borderColor: Colors.blueLight,
                            }}
                            borderRadius={8}
                        />
                    </Flex>
                </Flex>
                <List display={"flex"} gap={20} flexWrap={"wrap"}>
                    {!!currentContact && (
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Editar Contato</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormUpdate id={currentContact.id} />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    )}
                    {user?.contacts.length ? (
                        user.contacts.map(
                            (contact) =>
                                !!contact.is_active && (
                                    <CardContactItem
                                        key={contact.id}
                                        contact={contact}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        onOpen={onOpen}
                                    />
                                )
                        )
                    ) : (
                        <Flex w={"full"} flexDir={"column"} p={10} gap={20}>
                            <Text fontSize={33}>
                                Nenhuma Tecnologia foi Cadastrada ainda.
                            </Text>
                            <Text fontSize={22}>
                                Quando criar suas tecnologias você pode clicar
                                nos cards para removê-las ou atualizar seu
                                status
                            </Text>
                        </Flex>
                    )}
                </List>
            </Flex>
        </Container>
    );
};
