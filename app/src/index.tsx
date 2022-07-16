import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ProvideAuth } from "./hooks/useAuth";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <ProvideAuth>
                <App />
            </ProvideAuth>
        </ChakraProvider>
    </React.StrictMode>
);
