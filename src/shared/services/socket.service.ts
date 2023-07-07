import { io } from "socket.io-client";
import { CurrentUserInterface } from "../../auth/types/currentUser.interface";

type listenFuncType = (data: any) => void;

export const socket = io("http://localhost:4001", {
    autoConnect: false,
    auth: {
        token: window.localStorage.getItem("token"),
        // token: currentUser.token,
    },
});

export const setupSocketConnection = (currentUser: CurrentUserInterface) => {
    socket.connect();
};

export const disconnect = () => {
    socket.disconnect();
};

export const emit = (eventName: string, message: any) => {
    socket.emit(eventName, message);
};

// export const listen = (eventName: string, callback: (data: any) => void) => {
//     socket.on(eventName, callback);
// };

export const listen = (eventName: string, callback: (data: string) => void) => {
    socket.on(eventName, (data) => {
        callback(data);
    });
};

export const socketOff = (eventName: string, callback: listenFuncType) => {
    socket.off(eventName, callback);
};
