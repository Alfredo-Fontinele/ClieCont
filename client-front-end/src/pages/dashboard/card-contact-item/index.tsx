import { Contact } from "../../../../../api-client-nodejs/src/entities/Contact";
import { Image, Link, ListItem, Text } from "@chakra-ui/react";
import { Colors } from "../../../styles/colors";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { BsPerson } from "react-icons/bs";

interface ICardContactItemProps {
    contact: Contact;
}

export const CardContactItem = ({ contact }: ICardContactItemProps) => {
    return (
        <ListItem
            display={"flex"}
            textDecoration="none"
            transition={"all 0.3s"}
            cursor="pointer"
            _hover={{
                transform: "scale(1.02)",
            }}
            flexDirection="column"
            w="full"
            maxW={400}
            border={`1px solid ${Colors.white_gray3}`}
            borderRadius={10}
            justifyContent="space-between"
            gap={5}
            p={5}
        >
            <Text fontSize="large" fontWeight={"500"}>
                <BsPerson />
                <Text>{contact.name}</Text>
            </Text>
            <Text fontSize="large" fontWeight={"500"}>
                <EmailIcon />
                <Text>{contact.email}</Text>
            </Text>
            <Text fontSize="large" fontWeight={"500"}>
                <PhoneIcon />
                <Text>{contact.phone}</Text>
            </Text>
        </ListItem>
    );
};
