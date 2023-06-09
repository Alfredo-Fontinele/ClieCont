import { Flex } from "@chakra-ui/react";
import { useState } from "react";

export const IconPerson = () => {
    return (
        <Flex
            position={"fixed"}
            top={440}
            right={10}
            bgImage="url('https://olirdesigns.com/wp-content/uploads/2021/06/ui-ux.png')"
            bgRepeat={"no-repeat"}
            bgPos={"bottom"}
            h={"600px"}
            w={"600px"}
            zIndex={1}
        ></Flex>
    );
};
