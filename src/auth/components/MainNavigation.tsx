import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../services/AuthContext";
import classes from "./MainNavigation.module.css";
import * as authService from "../services/authService";

export const MainNavigation = () => {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = useAuthContext();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/login");
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
                        {!currentUser && (
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
                        {!currentUser && (
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
                        {currentUser && (
                            <li>
                                <span className={classes.user}>
                                    {currentUser?.username}
                                </span>
                            </li>
                        )}
                        {currentUser && (
                            <li className={classes.logout}>
                                <span onClick={handleLogout}>Logout</span>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};
