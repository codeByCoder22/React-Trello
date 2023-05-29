import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import {CartWidget} from "./CartWidget"
import { useAuthContext } from "../auth/services/AuthContext";

export const Header = () => {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();

    const handleLogout = () => {
        setCurrentUser(null);
        setIsLogged(false);
        window.localStorage.removeItem("token");
        navigate("/register");
    };

    return (
        <>
            <header>
                <div className="">
                    <Link to="/">Home</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    {!isLogged && <Link to="/register">Register</Link>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {isLogged && (
                        <span>current user: {currentUser?.username}</span>
                    )}
                    &nbsp;&nbsp;&nbsp;
                    {isLogged && <button onClick={handleLogout}>Logout</button>}
                </div>
            </header>
            <hr />
        </>
    );
};
