import { Contact } from "../../../interfaces/entities";
import {
    Flex,
    ListItem,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, DragHandleIcon } from "@chakra-ui/icons";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { useApi } from "../../../context/api-context";
import { Colors } from "../../../styles/colors";

interface ICardContactItemProps {
    contact: Contact;
    handleEditModalOpen: Function;
}

export const CardContactItem = ({
    contact,
    handleEditModalOpen,
}: ICardContactItemProps) => {
    const { setCurrentContact } = useApi();
    const { colorMode } = useColorMode();
    return (
        <Flex w="full" maxW={400}>
            <ListItem
                bg={
                    colorMode === "dark"
                        ? Colors.chakra.gray700
                        : Colors.menuItem
                }
                color={Colors.white_gray0}
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
                onClick={() => {
                    setCurrentContact(contact);
                    handleEditModalOpen();
                }}
            >
                <Flex alignItems={"center"} gap={5}>
                    <DragHandleIcon />
                    <Text
                        fontWeight={"500"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        fontSize={16}
                        color={Colors.white_gray4}
                    >
                        {contact.name ?? "Nome Não Informado"}
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={5}>
                    <EmailIcon color={Colors.main} />
                    <Text
                        fontWeight={"500"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        fontSize={16}
                        color={Colors.white_gray4}
                    >
                        {contact.email ?? "Sem E-mail"}
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={5}>
                    <PhoneIcon color={Colors.spring} />
                    <Text
                        fontWeight={"500"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                        fontSize={16}
                        color={Colors.white_gray4}
                    >
                        {contact.phone
                            ? formatPhoneNumber(contact.phone)
                            : "Telefone Não Informado"}
                    </Text>
                </Flex>
            </ListItem>
        </Flex>
    );
};
