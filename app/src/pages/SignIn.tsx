import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await auth.signIn(username, password);
        if (result.success) {
            navigate({ pathname: "/dashboard" });
        } else {
            alert(result.message);
        }
    };

    return (
        <form noValidate onSubmit={executeSignIn}>
            <div>
                <label htmlFor="username">メールアドレス: </label>
                <input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">パスワード: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">ログイン</button>
        </form>
    );
}
