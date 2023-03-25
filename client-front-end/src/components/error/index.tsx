import { Flex, Text } from "@chakra-ui/react";

interface IError {
    text: any;
}

export const Error = ({ text }: IError) => {
    return (
        <Flex justifyContent={"flex-start"} alignItems={"center"} p={".7rem 0"}>
            <Text fontWeight={500}>{text}</Text>
        </Flex>
    );
};
