import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./auth/services/AuthContext";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/components/Register";
import { Header } from "./shared/Header";
import { Home } from "./Home/Home";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
