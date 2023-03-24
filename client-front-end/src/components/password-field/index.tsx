import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const { isOpen, onToggle } = useDisclosure();
        const inputRef = useRef<HTMLInputElement>(null);

        const mergeRef = useMergeRefs(inputRef, ref);
        const onClickReveal = () => {
            onToggle();
            if (inputRef.current) {
                inputRef.current.focus({ preventScroll: true });
            }
        };

        return (
            <InputGroup>
                <InputLeftElement>
                    <IconButton
                        variant="link"
                        aria-label={
                            isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputLeftElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    placeholder="Insira sua senha"
                    type={isOpen ? "text" : "password"}
                    autoComplete="current-password"
                    {...props}
                />
            </InputGroup>
        );
    }
);
