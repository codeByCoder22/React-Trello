import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";
import socketService from "./socket.service";
import { setBoard, setColumn } from "../../boardSlice";
import { SocketEventsEnum } from "../types/socketEvents.enum";

export const leaveBoard = (boardId: string | undefined) => {
    console.log("leaveBoard: boardId: ", boardId);
    socketService.emit(SocketEventsEnum.boardsLeave, boardId);
    setBoard(null);
};
