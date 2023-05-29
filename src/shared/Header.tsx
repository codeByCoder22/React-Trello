import React from "react";
import { Link } from "react-router-dom";
// import {CartWidget} from "./CartWidget"

export const Header = () => (
    <header>
        <>
            <div className="">
                <Link to="/">Home</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/register">Register</Link>
            </div>
            <hr />
        </>
    </header>
);
