import {
    Flex,
    Container,
    Text,
    useMediaQuery,
    useColorMode,
} from "@chakra-ui/react";
import { Colors } from "../../styles/colors";
import { Header } from "./../../components/header/index";
import { IconPerson } from "./icon-person/index";

export const Home = () => {
    const [isLargerThan800] = useMediaQuery("(min-width: 820px)");
    const { colorMode } = useColorMode();

    return (
        <Container w={"full"} maxW={"2000px"}>
            <Flex w={"full"} minH={"100vh"} flexDir={"column"} gap={10}>
                <Header />
                {!isLargerThan800 && <IconPerson />}
                <Flex
                    w={"full"}
                    justifyContent="space-between"
                    gap={70}
                    zIndex={2}
                    p={"2rem 5rem"}
                >
                    <Flex flexDir={"column"} justifyContent="center" gap={30}>
                        <Text fontSize={50} fontWeight={"bold"}>
                            Bem-vindo ao ClieCont
                        </Text>
                        <Text
                            lineHeight={8}
                            fontSize={20}
                            w={"full"}
                            maxW={600}
                            color={colorMode === "light" ? Colors.gray3 : ""}
                        >
                            Com uma interface intuitiva e fácil de usar, o
                            ClieCont é a escolha perfeita para empresários,
                            empreendedores e profissionais de vendas que desejam
                            manter um controle completo de seus clientes e
                            contatos.
                        </Text>
                    </Flex>
                    {!!isLargerThan800 && (
                        <Flex>
                            <img
                                src={
                                    "https://olirdesigns.com/wp-content/uploads/2021/06/ui-ux.png"
                                }
                                style={{
                                    height: "400px",
                                    minWidth: "400px",
                                    backgroundSize: "cover",
                                }}
                                alt="logo"
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Container>
    );
};
