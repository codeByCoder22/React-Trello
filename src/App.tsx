import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./auth/services/AuthContext";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/components/Register";
import Login from "./auth/components/Login";
import { Header } from "./shared/Header";
import { Home } from "./Home/Home";
import { Board } from "./board/Board";
import { redirect } from "react-router-dom";
import { ProtectedRoute } from "./auth/services/ProtectedRoute";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="/board"
                    element={
                        <ProtectedRoute>
                            <Board />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
