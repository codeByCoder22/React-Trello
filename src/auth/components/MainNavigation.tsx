import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../services/AuthContext";
import classes from "./MainNavigation.module.css";
import * as authService from "../services/authService";

export const MainNavigation = () => {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();

    const handleLogout = () => {
        setCurrentUser(null);
        setIsLogged(false);
        navigate("/register");
        authService.logout();
    };

    return (
        <>
            <header className={classes.header}>
                <nav>
                    <ul className={classes.list}>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/boards"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Boards
                            </NavLink>
                        </li>
                        {!isLogged && (
                            <li>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    Register
                                </NavLink>
                            </li>
                        )}
                        {!isLogged && (
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {isLogged && (
                            <li>
                                <span>{currentUser?.username}</span>
                            </li>
                        )}
                        {isLogged && (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
            <hr />
        </>
    );
};
