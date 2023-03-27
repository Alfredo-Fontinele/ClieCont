import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { Contact } from "../../../../../api-client-nodejs/src/entities/Contact";
import { IModalProps } from "../../../interfaces/others";
import { FormAdd } from "../form-add";

export const ModalAdd = ({ isOpen, onClose }: IModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text>Adicionar Contato</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <FormAdd onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
