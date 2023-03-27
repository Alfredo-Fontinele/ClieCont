import { IItemMenuOptions } from "../../interfaces/others";
import { MenuItems } from "./../menu-items/index";
import { Flex, Text } from "@chakra-ui/react";
import { ThemeIcon } from "../theme-icon";
import { Link } from "react-router-dom";
import { Colors } from "../../styles/colors";
import { useApi } from "../../context/api-context";

interface IHeaderProps {
    currentTypePage: "default" | "dashboard";
}

export const Header = ({ currentTypePage }: IHeaderProps) => {
    const { currentPage, setCurrentPage, deleteToken } = useApi();

    const optionsHeader: IItemMenuOptions[] = [
        { name: "Home", href: "/", onClick: () => setCurrentPage("Home") },
        {
            name: "Login",
            href: "/login",
            onClick: () => setCurrentPage("Login"),
        },
        {
            name: "Register",
            href: "/register",
            onClick: () => setCurrentPage("Register"),
        },
    ];

    const optionsHeaderDashboard: IItemMenuOptions[] = [
        { name: "Home", href: "/", onClick: () => setCurrentPage("Home") },
        {
            name: "Sair",
            href: "/login",
            onClick: () => {
                setCurrentPage("Login");
                deleteToken();
            },
        },
    ];

    const handleItemClick = (onClick: Function) => {
        onClick();
    };

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
                    {currentTypePage === "default"
                        ? optionsHeader.map((option) => (
                              <Link key={option.href} to={option.href}>
                                  <Text>{option.name}</Text>
                              </Link>
                          ))
                        : optionsHeaderDashboard.map((option) => (
                              <Link
                                  key={option.href}
                                  to={option.href}
                                  onClick={() =>
                                      handleItemClick(option.onClick)
                                  }
                              >
                                  <Text>{option.name}</Text>
                              </Link>
                          ))}
                </Flex>
                <ThemeIcon />
                <Flex display={{ base: "flex", sm: "none" }}>
                    {currentTypePage === "default" ? (
                        <MenuItems options={optionsHeader} />
                    ) : (
                        <MenuItems options={optionsHeaderDashboard} />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};
