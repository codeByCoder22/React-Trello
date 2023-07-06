import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";

export const getBoards = async (): Promise<BoardInterface[]> => {
    return axiosInstance
        .get("/boards")
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error retrieving boards: " + error.message);
        });
};
