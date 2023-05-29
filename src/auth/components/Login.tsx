import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import axiosInstance from "../../utils/axiosInstance";
import { useAuthContext } from "../services/AuthContext";

interface CurrentUserInterface {
    id: string;
    token: string;
    username: string;
    email: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();

    const Login = async (loginRequest: LoginRequestInterface) => {
        try {
            const response = await axiosInstance.post<CurrentUserInterface>(
                "/api/users/login",
                loginRequest
            );
            console.log(response.data);
            const token = response.data.token;
            const currentUser = response.data;

            setToken(token);
            setCurrentUser(currentUser);
            setIsLogged(true);
            setError("");
            navigate("/");
        } catch (error: any) {
            setCurrentUser(null);
            setIsLogged(false);
            console.log(error);
            setError(error.response.data.error);
            // setError("Registration failed. Please try again.");
        }
    };

    const setToken = (token: string): void => {
        localStorage.setItem("token", token);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequest: LoginRequestInterface = {
            email,
            password,
        };

        await Login(loginRequest);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
