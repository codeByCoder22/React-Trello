import { io, Socket } from "socket.io-client";
import { CurrentUserInterface } from "../../auth/types/currentUser.interface";

class SocketService {
    private socket: Socket | undefined;
    private static instance: SocketService;

    private constructor() {
        this.initializeSocket();
    }

    private initializeSocket(): void {
        this.socket = io("http://localhost:4001");
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    setupSocketConnection(currentUser: CurrentUserInterface): void {
        // if (this.socket) {
        //     this.socket.disconnect();
        // }

        this.socket = io("http://localhost:4001", {
            auth: {
                token: currentUser.token,
            },
        });
    }

    disconnect(): void {
        if (!this.socket) {
            throw new Error("Socket connection is not established");
        }
        this.socket.disconnect();
    }

    emit(eventName: string, message: any): void {
        if (!this.socket) {
            throw new Error("Socket connection is not established");
        }
        this.socket.emit(eventName, message);
    }

    listen(eventName: string, callback: (data: any) => void): void {
        const socket = this.socket;
        if (!socket) {
            throw new Error("Socket connection is not established");
        }

        socket.on(eventName, (data) => {
            callback(data);
        });
    }
}

const socketService = SocketService.getInstance();

export default socketService;
