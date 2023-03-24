import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BodyConfigStyle } from "./styles/reset";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import React from "react";

const theme = extendTheme({
    components: {
        BodyConfigStyle,
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
