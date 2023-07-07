import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";
import * as socketService from "./socket.service";
import { SocketEventsEnum } from "../types/socketEvents.enum";

export const getBoards = async (): Promise<BoardInterface[]> => {
    return axiosInstance
        .get("/boards")
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error retrieving boards: " + error.message);
        });
};

export const getBoard = async (
    boardId: string | undefined
): Promise<BoardInterface> => {
    return axiosInstance
        .get(`/boards/${boardId}`)
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error retrieving board: " + error.message);
        });
};

export const createBoard = async (title: string): Promise<BoardInterface> => {
    return axiosInstance
        .post("/boards", { title })
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error creating board: " + error.message);
        });
};

export const updateBoard = async (
    boardId: string | undefined,
    fields: { title: string }
) => {
    socketService.emit(SocketEventsEnum.boardsUpdate, { boardId, fields });
};
