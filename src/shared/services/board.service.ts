import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";
import socketService from "./socket.service";
import { setBoard, setColumn } from "../../boardSlice";

export const leaveBoard = (boardId: string) => {
    socketService.emit("leaveBoard", boardId);
    setBoard(null);
};
