import { io, Socket } from "socket.io-client";
import { CurrentUserInterface } from "../../auth/types/currentUser.interface";

type listenFuncType = (data: any) => void;
const socket_IO_Url = process.env.REACT_APP_SOCKET_URL as string;

export const socket = io(socket_IO_Url, {
    autoConnect: false,
    auth: {
        token: window.localStorage.getItem("token"),
        // token: currentUser.token,
    },
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
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

export const listen = (eventName: string, callback: (data: any) => void) => {
    socket.on(eventName, callback);
};

export const socketOff = (eventName: string, callback: listenFuncType) => {
    socket.off(eventName, callback);
};

export const socketRemoveAllListeners = () => {
    socket.removeAllListeners();
};
