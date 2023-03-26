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

export const Dashboard = () => {
    const { navigate, getUserByTokenCookie, getToken, setUser, user } =
        useApi();
    const [currentContact, setCurrentContact] = useState<Contact>();
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
                <Text fontWeight={500} fontSize={30}>
                    Olá {user?.name}
                </Text>
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
                                        setContact={setCurrentContact}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        onOpen={onOpen}
                                    />
                                )
                        )
                    ) : (
                        <>
                            <h3>Nenhuma Tecnologia foi Cadastrada ainda.</h3>
                            <p>
                                Quando criar suas tecnologias você pode clicar
                                nos cards para removê-las ou atualizar seu
                                status
                            </p>
                        </>
                    )}
                </List>
            </Flex>
        </Container>
    );
};
