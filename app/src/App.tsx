import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function App() {
    const auth = useAuth();

    if (auth.isLoading) {
        return <Box />;
    }

    const TopPage = () => (
        <Box>
            <Heading>Cognito Test</Heading>
            <Text>
                {auth.isAuthenticated ? "STATUS: LOGIN" : "STATUS: NOT LOGIN"}
            </Text>
            <Link to="/signin">
                Go to LoginPage(Click Here) <ExternalLinkIcon mx="2px" />
            </Link>
        </Box>
    );

    const SuccessPage = () => (
        <PrivateRoute>
            <Box>Welcome🎉 {auth.username}👍</Box>
            <Button onClick={() => auth.signOut()}>Log out</Button>
        </PrivateRoute>
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TopPage />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="dashboard" element={<SuccessPage />}></Route>
                <Route path="*" element={<p>Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
