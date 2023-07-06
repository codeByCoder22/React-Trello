import { useEffect, useRef } from "react";
import { CurrentUserInterface } from "../../auth/types/currentUser.interface";
import { io, Socket } from "socket.io-client";

export function useSocket(currentUser: CurrentUserInterface) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:4001", {
            auth: {
                token: currentUser.token,
            },
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [currentUser]);

    function emit(eventName: string, message: any): void {
        if (!socketRef.current) {
            throw new Error("Socket connection is not established");
        }
        socketRef.current.emit(eventName, message);
    }

    function listen<T>(eventName: string, callback: (data: T) => void): void {
        const socket = socketRef.current;
        if (!socket) {
            throw new Error("Socket connection is not established");
        }

        socket.on(eventName, (data: T) => {
            callback(data);
        });
    }

    return { emit, listen };
}
