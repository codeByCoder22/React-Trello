import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { useAuthContext } from "../services/AuthContext";
import * as authService from "../services/authService";
import * as socketService from "../../shared/services/socket.service";
import classes from "./au.module.css";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const registerRequest: RegisterRequestInterface = {
            email,
            username,
            password,
        };

        authService
            .register(registerRequest)
            .then((currentUser) => {
                authService.setToken(currentUser);
                setCurrentUser(currentUser);
                setIsLogged(true);
                setError("");
                navigate("/boards");
                socketService.setupSocketConnection(currentUser);
            })
            .catch((error) => {
                setCurrentUser(null);
                setIsLogged(false);
                console.log(error.response);
                setError(
                    // error.response?.data?.error ||
                    //     "An error occurred. Please try again."
                    error.response?.data ||
                        "An error occurred. Please try again."
                );
            })
            .finally(() => {
                console.log("finally");
            });
    };

    return (
        <div className={classes.au_container}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
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
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                {/* {error && <p>{error}</p>} */}
                {error && (
                    <ul>
                        {Object.values(error).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default Register;
