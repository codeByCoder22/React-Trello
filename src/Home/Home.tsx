import React from "react";
import classes from "./Home.module.css";
import { NavLink } from "react-router-dom";

interface HomeProps {
    useProductsHook?: () => {
        isLoading: boolean;
        error: boolean;
    };
}

export const Home = ({ useProductsHook }: HomeProps) => {
    return (
        <>
            <div className={classes.home}>
                <h1>Home</h1>
                <div className={classes.layout}>
                    <p>
                        Please use username :{" "}
                        <span className={classes.color}>12@12.com</span>
                    </p>
                    <p>
                        passsword word:{" "}
                        <span className={classes.color}>12</span>
                    </p>
                    <p>to test this application</p>
                    <NavLink to="/login" className={classes.link}>
                        Login
                    </NavLink>
                </div>
            </div>
        </>
    );
};
