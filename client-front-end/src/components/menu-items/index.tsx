import {
    Flex,
    IconButton,
    IconButtonProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface IOption {
    name: string;
    href: string;
}

interface IMenuItemProps {
    options: IOption[];
}

export const MenuItems = ({ options }: IMenuItemProps) => {
    return (
        <Flex>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                />
                <MenuList>
                    {options.map((option) => (
                        <Link key={option.name} to={option.href}>
                            <MenuItem fontWeight={"medium"} key={option.name}>
                                {option.name}
                            </MenuItem>
                        </Link>
                    ))}
                </MenuList>
            </Menu>
        </Flex>
    );
};
