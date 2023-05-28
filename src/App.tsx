import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./auth/services/AuthContext";

function App() {
    const { currentUser, setCurrentUser, isLogged, setIsLogged } =
        useAuthContext();
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {/* <p>Current User: {currentUser ? "nobod"}</p> */}
                    <p>
                        Current User:{" "}
                        {currentUser ? currentUser.username : "nobod"}
                    </p>
                    {/* <button onClick={() => setCurrentUser("John Doe")}>
                        Set Current User
                    </button> */}
                    <p>Is Logged: {isLogged ? "Yes" : "No"}</p>
                    {/* <button onClick={() => setIsLogged(true)}>
                        Set Logged
                    </button> */}
                </div>
            </header>
        </div>
    );
}

export default App;
