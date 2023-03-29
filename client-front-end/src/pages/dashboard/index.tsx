import {
    Button,
    Container,
    Flex,
    List,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Contact } from "../../interfaces/entities";
import { CardContactItem } from "./card-contact-item/index";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useApi } from "../../context/api-context";
import { Colors } from "../../styles/colors";
import { AddIcon } from "@chakra-ui/icons";
import { ModalUpdate } from "./modal-update";
import { ModalAdd } from "./modal-add/index";
import { motion } from "framer-motion";

export const Dashboard = () => {
    const { navigate, getUserByTokenCookie, setUser, user, currentContact } =
        useApi();
    const [contacts, setContacts] = useState<Contact[]>([]);

    document.title = `Dashboard`;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleEditModalOpen = () => setIsEditModalOpen(true);
    const handleEditModalClose = () => setIsEditModalOpen(false);

    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => setIsAddModalOpen(false);

    const setClientContacts = useCallback(async () => {
        const user = await getUserByTokenCookie();
        setContacts(user.contacts);
    }, [contacts]);

    useLayoutEffect(() => {
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
                            onClick={handleAddModalOpen}
                            borderRadius={8}
                        />
                    </Flex>
                </Flex>
                <ModalAdd
                    isOpen={isAddModalOpen}
                    onClose={handleAddModalClose}
                />
                <motion.ul
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <List display={"flex"} gap={20} flexWrap={"wrap"}>
                        {!!currentContact && (
                            <ModalUpdate
                                currentContact={currentContact}
                                isOpen={isEditModalOpen}
                                onClose={handleEditModalClose}
                            />
                        )}
                        {user?.contacts.length ? (
                            user.contacts.map(
                                (contact: Contact) =>
                                    !!contact.is_active && (
                                        <CardContactItem
                                            key={contact.id}
                                            contact={contact}
                                            handleEditModalOpen={
                                                handleEditModalOpen
                                            }
                                        />
                                    )
                            )
                        ) : (
                            <Flex py={8}>
                                <Text fontSize={22}>
                                    Bem-vindo à sua nova plataforma de criação
                                    de contatos! Sua dashboard está pronta para
                                    ser preenchida com suas informações de
                                    contato."
                                </Text>
                            </Flex>
                        )}
                    </List>
                </motion.ul>
            </Flex>
        </Container>
    );
};
