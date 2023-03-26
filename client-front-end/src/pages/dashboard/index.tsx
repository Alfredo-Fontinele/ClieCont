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
import { useState, useEffect } from "react";
import { FormUpdate } from "./form-update";

export const Dashboard = () => {
    const { navigate, getUserByToken, setUser, user, contacts, setContacts } =
        useApi();
    const [currentContact, setCurrentContact] = useState<Contact>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        (async () => {
            await getUserByToken()
                .then((res) => setUser(res))
                .catch(() => navigate("/login"));
        })();
    }, [contacts]);

    return (
        <Container w={"full"} maxW={"8xl"} minH={"100vh"}>
            <Flex w={"full"} p={6} flexDir={"column"} gap={10}>
                <Text fontWeight={500} fontSize={30}>
                    Olá {user?.name}
                </Text>
                <List display={"flex"} gap={20}>
                    {!!currentContact && (
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Editar Contato</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <FormUpdate id={currentContact.id} />
                                </ModalBody>

                                {/* <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter> */}
                            </ModalContent>
                        </Modal>
                    )}
                    {!!user &&
                        user.contacts?.map(
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
                        )}
                </List>
            </Flex>
        </Container>
    );
};
