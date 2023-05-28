import React, { useState } from "react";
import axios from "axios";

import { RegisterRequestInterface } from "../types/registerRequest.interface";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../services/AuthContext";

// export interface RegisterRequestInterface {
//     email: string;
//     username: string;
//     password: string;
// }

interface CurrentUserInterface {
    id: string;
    token: string;
    username: string;
    email: string;
}

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:4001",
// });

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // const { currentUser, setCurrentUser, isLogged, setIsLogged } =
    // useAuthContext();

    const register = async (registerRequest: RegisterRequestInterface) => {
        try {
            const response = await axiosInstance.post<CurrentUserInterface>(
                "/api/users",
                registerRequest
            );
            const token = response.data.token;
            const currentUser = response.data;

            setToken(token);
            setCurrentUser(currentUser);
            // navigateTo("/");
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.error);
            // setError("Registration failed. Please try again.");
        }
    };

    const setToken = (token: string): void => {
        localStorage.setItem("token", token);
    };

    const setCurrentUser = (currentUser: CurrentUserInterface): void => {
        // Set the current user in the context or state
        // ...
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const registerRequest: RegisterRequestInterface = {
            email,
            username,
            password,
        };

        await register(registerRequest);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <hr />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <hr />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <hr />
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
