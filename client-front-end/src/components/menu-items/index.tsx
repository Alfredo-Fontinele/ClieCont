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
import { IItemMenuOptions } from "../../interfaces/others";

interface IMenuItemProps {
    options: IItemMenuOptions[];
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
                        <Link
                            key={option.name}
                            to={option.href}
                            onClick={() => option.onClick()}
                        >
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
