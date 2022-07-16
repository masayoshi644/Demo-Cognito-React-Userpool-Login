import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { SuccessPage } from "./pages/Success";

function App() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <Box />;
    }

    const TopPage = () => (
        <Flex justify={"center"}>
            <VStack h={500} justify="center" spacing={8}>
                <Text fontSize="5xl">Cognito Test</Text>
                <Text fontSize={"3xl"}>
                    {auth.isAuthenticated
                        ? "STATUS: LOGIN"
                        : "STATUS: NOT LOGIN"}
                </Text>
                <Link to="/signin">
                    <Text fontSize={"2xl"}>
                        Go to LoginPage(Click Here){" "}
                        <ExternalLinkIcon mx="4px" />
                    </Text>
                </Link>
            </VStack>
        </Flex>
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TopPage />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="success" element={<SuccessPage />}></Route>
                <Route path="*" element={<p>Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
