import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Contact } from "../../../../../api-client-nodejs/src/entities/Contact";
import { useApi } from "../../../context/api-context";
import { IModalProps } from "../../../interfaces/others";
import { Colors } from "../../../styles/colors";
import { FormUpdate } from "../form-update";
import { toast } from "react-toastify";

interface IModalUpdate extends IModalProps {
    currentContact: Contact;
}

export const ModalUpdate = ({
    isOpen,
    onClose,
    currentContact,
}: IModalUpdate) => {
    const { deleteContact, getClient, getToken, user, setUser } = useApi();
    const [wantExclude, setWantExclude] = useState(false);
    const token = getToken();

    const onSubmitFormDelete = async () => {
        try {
            const contactUpdatedById = await deleteContact(
                currentContact.id,
                token
            );
            const clientFound = await getClient(user!.id, token);
            setUser(clientFound);
            setWantExclude(false);
            toast.success("Contato Deletado com Sucesso");
            onClose();
        } catch {
            toast.error("Ops. Algo deu errado");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text>Editar Contato</Text>
                    <form>
                        {!wantExclude ? (
                            <Button
                                bg="red.400"
                                color="white"
                                type={"button"}
                                onClick={() => setWantExclude(true)}
                            >
                                Excluir
                            </Button>
                        ) : (
                            <Button
                                bg={Colors.main}
                                color="white"
                                onClick={onSubmitFormDelete}
                            >
                                Confirmar !
                            </Button>
                        )}
                    </form>
                </ModalHeader>
                <ModalBody>
                    <FormUpdate id={currentContact.id} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
