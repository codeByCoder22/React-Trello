import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
                    <Link to="/board">Board</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    {!isLogged && <Link to="/register">Register</Link>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {!isLogged && <Link to="/login">Login</Link>}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {isLogged && <span>{currentUser?.username}</span>}
                    &nbsp;&nbsp;&nbsp;
                    {isLogged && <button onClick={handleLogout}>Logout</button>}
                </div>
            </header>
            <hr />
        </>
    );
};
