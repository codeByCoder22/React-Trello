import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { LoginRequestInterface } from "../types/loginRequest.interface";
import { useAuthContext } from "../services/AuthContext";
import * as authService from "../services/authService";
import * as socketService from "../../shared/services/socket.service";
import classes from "./au.module.css";
import axios from "../../utils/axios";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("12@12.com");
    const [password, setPassword] = useState("12");
    const [error, setError] = useState("");

    const { currentUser, setCurrentUser } = useAuthContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequest: LoginRequestInterface = {
            email: "12@12.com",
            password: "12",
        };

        // await Login(loginRequest);
        /*     authService
            .login(loginRequest)
            .then((currentUser) => {
                authService.setToken(currentUser);
                setCurrentUser(currentUser);
                // setIsLogged(true);
                setError("");
                socketService.setupSocketConnection(currentUser);
                navigate("/boards");
            })*/
        axios
            .post("/users/login", loginRequest)
            .then((res) => {
                console.log(res);
                // authService.setToken(res.data);
                setCurrentUser(res.data);
                // setIsLogged(true);
                setError("");
                socketService.setupSocketConnection(res.data);
                navigate("/boards");
            })
            .catch((error) => {
                setCurrentUser(null);
                // setIsLogged(false);
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
            <h2>Login</h2>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
                <Link to="/register">To Register</Link>
                {/* {error && <p>{error}</p>} */}
                {error && (
                    <ul className={classes.error}>
                        {Object.values(error).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default Login;
