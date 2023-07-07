import { ColumnInterface } from "../types/column.interface";
import axiosInstance from "../../utils/axiosInstance";

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
