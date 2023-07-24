import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/components/Register";
import Login from "./auth/components/Login";
import { MainNavigation } from "./auth/components/MainNavigation";
import { Home } from "./Home/Home";
import { Boards } from "./boards/Boards";
import { Board } from "./board/Board";
import { ProtectedRoute } from "./auth/services/ProtectedRoute";
import { TaskModal } from "./taskModal/TaskModal";

function App() {
    return (
        <>
            <MainNavigation />

            <main className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/boards"
                        element={
                            <ProtectedRoute>
                                <Boards />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/boards/:boardId"
                        element={
                            <ProtectedRoute>
                                <Board />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route
                        path="/boards/:boardId/tasks/:taskId"
                        element={
                            <ProtectedRoute>
                                <TaskModal />
                            </ProtectedRoute>
                        }
                    /> */}
                </Routes>
            </main>
        </>
    );
}

export default App;
