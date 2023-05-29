import React from "react";
import { Link } from "react-router-dom";
// import {CartWidget} from "./CartWidget"

export const Header = () => (
    <header>
        <>
            <div className="nav-brand">
                <Link to="/">
                    <h1>Goblin Store</h1>
                </Link>
                <p>Everything for your Typescript adventure</p>
            </div>
            <div className="cart">
                <h3>CartWidget</h3>
            </div>
            <hr />
        </>
    </header>
);
