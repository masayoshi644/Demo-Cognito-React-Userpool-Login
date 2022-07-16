import Amplify, { Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
// import  AWSConfigAuth from "../config/auth";
import { AwsConfigAuth } from "../config/auth";

Amplify.configure({ Auth: AwsConfigAuth });

interface UseAuth {
    isLoading: boolean;
    isAuthenticated: boolean;
    username: string;
    signUp: (username: string, password: string) => Promise<Result>;
    confirmSignUp: (verificationCode: string) => Promise<Result>;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => void;
}

interface Result {
    success: boolean;
    message: string;
}

type Props = {
    children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUsername(result.username);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUsername("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signUp = async (username: string, password: string) => {
        try {
            await Auth.signUp({ username, password });
            setUsername(username);
            setPassword(password);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "認証に失敗しました。",
            };
        }
    };

    const confirmSignUp = async (verificationCode: string) => {
        try {
            await Auth.confirmSignUp(username, verificationCode);
            const result = await signIn(username, password);
            setPassword("");
            return result;
        } catch (error) {
            return {
                success: false,
                message: "認証に失敗しました。",
            };
        }
    };

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            setUsername(result.username);
            setIsAuthenticated(true);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "認証に失敗しました。",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUsername("");
            setIsAuthenticated(false);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "ログアウトに失敗しました。",
            };
        }
    };

    return {
        isLoading,
        isAuthenticated,
        username,
        signUp,
        confirmSignUp,
        signIn,
        signOut,
    };
};
