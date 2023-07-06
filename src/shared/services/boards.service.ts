import { BoardInterface } from "../types/board.interface";
import axiosInstance from "../../utils/axiosInstance";

export const getBoards = async (): Promise<BoardInterface[]> => {
    return axiosInstance.get("/boards").then((res) => res.data);
};
