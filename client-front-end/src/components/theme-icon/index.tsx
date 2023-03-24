import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { Colors } from "../../styles/colors";

export const ThemeIcon = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            {colorMode === "light" ? (
                <MoonIcon
                    fontSize={20}
                    color={Colors.slate}
                    onClick={toggleColorMode}
                    cursor="pointer"
                />
            ) : (
                <SunIcon
                    fontSize={20}
                    color={Colors.main}
                    onClick={toggleColorMode}
                    cursor="pointer"
                />
            )}
        </>
    );
};
