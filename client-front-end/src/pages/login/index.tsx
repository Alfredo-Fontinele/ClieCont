import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { OAuthButtonGroup } from "../components/q-auth-button-group";
import { PasswordField } from "../components/password-field";
import { Colors } from "../../styles/colors";
import { Header } from "./../home/header/index";
import { useAPINews } from "../../context/useApiNews";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../schemas/loginSchema";
import { Error } from "../../components/error";
import { toast } from "react-toastify";
import { IconSvg } from "../../components/icon-svg";
import svg from "../../../src/assets/man-make-login.svg";

export const Login = () => {
    const { navigate } = useAPINews();
    document.title = "Login";

    const onSubmitFormLogin = (data: any) => {
        const existUser = DB.find((user) => user.email === data.email);
        if (existUser) {
            toast.success(`Show. Manda Bala ${existUser.name}`);
            navigate("/dashboard");
            return;
        }
        toast.error("Ops. Usuário não encontrado");
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    return (
        <>
            <Header />
            <Container
                w={"full"}
                maxW="8xl"
                py={{ base: 12 }}
                minH={"90vh"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Flex
                    gap={50}
                    w="full"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <IconSvg
                        icon={svg}
                        display={{ base: "none", xl: "flex" }}
                    />
                    <Flex flexDir={"column"}>
                        <Stack spacing="6" textAlign="center" p={6}>
                            <Heading size={"2xl"} color={Colors.slate}>
                                Log in to your account
                            </Heading>
                            <HStack
                                spacing="2"
                                justify="center"
                                flexWrap={"wrap"}
                            >
                                <Text>Don't have an account?</Text>
                                <Link
                                    style={{
                                        borderBottom: `1px solid ${Colors.slate}`,
                                        color: Colors.slate,
                                    }}
                                    to="/register"
                                >
                                    Sign Up
                                </Link>
                            </HStack>
                        </Stack>
                        <Box
                            py={{ base: "0", sm: "8" }}
                            px={{ base: "0", sm: "10" }}
                            bg={{ base: "transparent", sm: "bg-surface" }}
                            boxShadow={{ base: "none", sm: "md" }}
                            borderRadius={{ base: "none", sm: "xl" }}
                        >
                            <form
                                onSubmit={handleSubmit(onSubmitFormLogin)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 15,
                                }}
                            >
                                <Stack spacing="5">
                                    <FormControl>
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <Input {...register("email")} />
                                    </FormControl>
                                    {errors.email && (
                                        <Error text={errors.email.message} />
                                    )}
                                    <PasswordField {...register("password")} />
                                    {errors.password && (
                                        <Error text={errors.password.message} />
                                    )}
                                </Stack>
                                <HStack justify="space-between">
                                    <Checkbox defaultChecked>
                                        Remember me
                                    </Checkbox>
                                    <Button
                                        variant="link"
                                        colorScheme="blue"
                                        size="sm"
                                    >
                                        Forgot password?
                                    </Button>
                                </HStack>
                                <Stack spacing="6">
                                    <button
                                        type="submit"
                                        style={{
                                            padding: 10,
                                            borderRadius: 8,
                                            color: Colors.default,
                                            backgroundColor: Colors.slate,
                                        }}
                                    >
                                        Sign In
                                    </button>
                                    <HStack>
                                        <Divider />
                                        <Text
                                            fontSize="sm"
                                            whiteSpace="nowrap"
                                            color="muted"
                                        >
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <OAuthButtonGroup />
                                </Stack>
                            </form>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};
