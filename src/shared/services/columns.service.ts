import { ColumnInterface } from "../types/column.interface";
import axiosInstance from "../../utils/axiosInstance";
import * as socketService from "./socket.service";
import { SocketEventsEnum } from "../types/socketEvents.enum";

export const getColumns = async (
    boardId: string | undefined
): Promise<ColumnInterface[]> => {
    return axiosInstance
        .get(`/boards/${boardId}/columns`)
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error retrieving columns: " + error.message);
        });
};

export const updateColumn = async (
    boardId: string | undefined,
    columnId: string,
    fields: { title: string }
) => {
    socketService.emit(SocketEventsEnum.columnsUpdate, {
        boardId,
        columnId,
        fields,
    });
};
