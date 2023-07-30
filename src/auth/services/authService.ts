import axiosInstance from "../../utils/axiosInstance";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
// import { useAuthContext } from "../services/authContext";
import * as socketService from "../../shared/services/socket.service";

export const getCurrentUser = async (): Promise<CurrentUserInterface> => {
    return axiosInstance.get("/user").then((res) => res.data);
};

export const register = async (
    registerRequest: RegisterRequestInterface
): Promise<CurrentUserInterface> => {
    return axiosInstance.post("/users", registerRequest).then((res) => {
        return res.data;
    });
};

export const login = async (
    loginRequest: LoginRequestInterface
): Promise<CurrentUserInterface> => {
    return axiosInstance.post("/users/login", loginRequest).then((res) => {
        return res.data;
    });
};

export const setToken = (currentUser: CurrentUserInterface): void => {
    window.localStorage.setItem("token", currentUser.token);
    // window.localStorage.setItem("username", currentUser.username);
};

export const logout = (): void => {
    window.localStorage.removeItem("token");
    socketService.disconnect();
};
