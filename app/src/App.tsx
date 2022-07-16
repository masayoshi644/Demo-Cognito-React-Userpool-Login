import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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

    const SuccessPage = () => (
        <PrivateRoute>
            <VStack h={500} justify="center" spacing={3}>
                <Text fontSize="5xl">Welcome {auth.username}!!</Text>
                <Text fontSize="4xl">Login Succeed🎉</Text>
                <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => auth.signOut()}
                >
                    Log out
                </Button>
            </VStack>
        </PrivateRoute>
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
