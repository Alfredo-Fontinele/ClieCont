import { Container, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { CardContactItem } from "./card-contact-item/index";
import { useApi } from "../../context/api-context";
import { useEffect } from "react";

export const Dashboard = () => {
    const { navigate, getUserByToken, setUser, user } = useApi();

    useEffect(() => {
        (async () => {
            const userFound = await getUserByToken();
            if (!userFound) {
                navigate("/login");
                return;
            }
            setUser(userFound);
        })();
    }, []);

    return (
        <Container w={"full"} maxW={"8xl"} minH={"100vh"}>
            <Flex w={"full"} p={6} flexDir={"column"} gap={10}>
                <Text fontWeight={500} fontSize={30}>
                    Olá {user?.name}
                </Text>
                <List>
                    {!!user &&
                        user.contacts?.map(
                            (contact) =>
                                !!contact.is_active && (
                                    <CardContactItem contact={contact} />
                                )
                        )}
                </List>
            </Flex>
        </Container>
    );
};
