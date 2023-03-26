import { Contact } from "../../../../../api-client-nodejs/src/entities/Contact";
import { Flex, Image, Link, ListItem, Text } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Colors } from "../../../styles/colors";
import { BsPerson } from "react-icons/bs";
import React from "react";

interface ICardContactItemProps {
    contact: Contact;
    isOpen: boolean;
    onOpen: Function;
    onClose: Function;
    setContact: Function;
}

export const CardContactItem = ({
    contact,
    isOpen,
    onOpen,
    onClose,
    setContact,
}: ICardContactItemProps) => {
    return (
        <Flex
            onClick={() => {
                setContact(contact);
                console.log(contact);
            }}
            w="full"
            maxW={400}
        >
            <ListItem
                display={"flex"}
                textDecoration="none"
                transition={"all 0.3s"}
                cursor="pointer"
                _hover={{
                    transform: "scale(1.02)",
                }}
                flexDirection="column"
                w="inherit"
                maxW={"inherit"}
                border={`1px solid ${Colors.white_gray3}`}
                borderRadius={10}
                justifyContent="space-between"
                gap={5}
                p={5}
                onClick={() => onOpen()}
            >
                <Flex alignItems={"center"} gap={5}>
                    <BsPerson />
                    <Text fontSize="large" fontWeight={"500"}>
                        {contact.name}
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={5}>
                    <EmailIcon />
                    <Text fontSize="large" fontWeight={"500"}>
                        {contact.email}
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={5}>
                    <PhoneIcon />
                    <Text fontSize="large" fontWeight={"500"}>
                        {contact.phone}
                    </Text>
                </Flex>
            </ListItem>
        </Flex>
    );
};
