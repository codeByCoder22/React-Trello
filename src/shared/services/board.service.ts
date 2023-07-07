import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";
import * as socketService from "./socket.service";
import { setBoard, setColumns } from "../../boardSlice";
import { SocketEventsEnum } from "../types/socketEvents.enum";
// import { useSelector, useDispatch } from "react-redux";

export const leaveBoard = (boardId: string | undefined) => {
    console.log("leaveBoard: boardId: ", boardId);
    socketService.emit(SocketEventsEnum.boardsLeave, boardId);
    setBoard(null);
};

export const set_Board = (board: BoardInterface | null) => {
    // const dispatch = useDispatch();

    console.log("set_Board: board: ", board);
    setBoard(board);
};
