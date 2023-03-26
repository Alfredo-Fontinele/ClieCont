import { IItemMenuOptions } from "../../interfaces/others";
import { MenuItems } from "./../menu-items/index";
import { Flex, Text } from "@chakra-ui/react";
import { ThemeIcon } from "../theme-icon";
import { Link } from "react-router-dom";
import { Colors } from "../../styles/colors";

const optionsHeader: IItemMenuOptions[] = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];

export const Header = () => {
    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            h={"14"}
            w={"full"}
            p={4}
        >
            <Flex>
                <Text fontSize={"2xl"} fontWeight={"bold"} color={Colors.main}>
                    ClieCont
                </Text>
            </Flex>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={{ base: 2, sm: 6 }}
            >
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={5}
                    display={{ base: "none", sm: "flex" }}
                >
                    {optionsHeader.map((option) => (
                        <Link key={option.href} to={option.href}>
                            <Text>{option.name}</Text>
                        </Link>
                    ))}
                </Flex>
                <ThemeIcon />
                <Flex display={{ base: "flex", sm: "none" }}>
                    <MenuItems options={optionsHeader} />
                </Flex>
            </Flex>
        </Flex>
    );
};
