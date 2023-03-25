import { ToastContainerComponent } from "./components/toast-container";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BodyConfigStyle } from "./styles/reset";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import React from "react";
import { ApiProvider } from "./context/api-context";

const theme = extendTheme({
    components: {
        BodyConfigStyle,
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApiProvider>
                <ToastContainerComponent />
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </ApiProvider>
        </BrowserRouter>
    </React.StrictMode>
);
