import { Box, useColorMode, useStyleConfig } from "@chakra-ui/react";
import { IChildren } from "./../interfaces/others";
import { Colors } from "./colors";

export const GlobalStyle = ({ children }: IChildren) => {
    const { colorMode } = useColorMode();
    const styles = useStyleConfig("BodyConfigStyle");
    return (
        <Box
            __css={styles}
            bg={colorMode === "dark" ? Colors.menuItem : Colors.default}
        >
            {children}
        </Box>
    );
};
