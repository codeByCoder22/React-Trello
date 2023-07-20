import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
    process.env.NODE_ENV === "production"
        ? undefined
        : "http://codebycoder.com:4001";

export const socket = io("http://codebycoder.com:4001", {
    autoConnect: false,
    auth: {
        token: localStorage.getItem("token"),
        // token: `Bearer ${localStorage.getItem("token")}`,
    },
});
/*
export const socketConnect = () => {
    socket.connect();
};

export const socketDisconnect = () => {
    socket.disconnect();
};

export const socketEmitter = (event, data) => {
    socket.emit(event, data);
};

export const socketOn = (event, callback) => {
    socket.on(event, callback);
};

export const socketOff = (event, callback) => {
    socket.off(event, callback);
};
*/
