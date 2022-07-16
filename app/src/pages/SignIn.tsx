import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import {
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Spacer,
    Stack,
} from "@chakra-ui/react";

export function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await auth.signIn(username, password);
        if (result.success) {
            navigate({ pathname: "/success" });
        } else {
            alert(result.message);
        }
    };

    return (
        <Flex justify={"center"}>
            <Box
                h={"500"}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <form noValidate onSubmit={executeSignIn}>
                    <Box>
                        <FormLabel htmlFor="username">User Name</FormLabel>
                        <Input
                            type="text"
                            placeholder="UserID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Spacer height="10px" />
                    <Box>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Spacer height="15px" />
                    <Stack align="center">
                        <Button type="submit" colorScheme="teal">
                            ログイン
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}
