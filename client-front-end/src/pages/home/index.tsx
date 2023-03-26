import {
    Flex,
    Container,
    Text,
    useMediaQuery,
    useColorMode,
} from "@chakra-ui/react";
import ImgPersonHome from "../../../src/assets/person-home.png";
import { Header } from "./../../components/header/index";
import { IconPerson } from "./icon-person/index";
import { Colors } from "../../styles/colors";

const styleImage = {
    height: "400px",
    minWidth: "350px",
    backgroundSize: "cover",
};

export const Home = () => {
    const [isLargerThan800] = useMediaQuery("(min-width: 768px)");
    const { colorMode } = useColorMode();

    return (
        <Container w={"full"} maxW={"8xl"}>
            <Flex
                w={"full"}
                minH={"100vh"}
                flexDir={"column"}
                gap={10}
                p={"8rem 0"}
            >
                {!isLargerThan800 && <IconPerson />}
                <Flex
                    w={"full"}
                    justifyContent="space-around"
                    gap={70}
                    zIndex={2}
                    p={{ sm: 0, md: "1rem 5rem" }}
                >
                    <Flex
                        flexDir={"column"}
                        justifyContent="center"
                        gap={30}
                        minW={"300px"}
                        w={"full"}
                    >
                        <Text fontSize={50} fontWeight={"bold"}>
                            Bem-vindo ao
                            <Text color={Colors.main}>ClieCont</Text>
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
                                src={ImgPersonHome}
                                style={styleImage}
                                alt="logo"
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Container>
    );
};
