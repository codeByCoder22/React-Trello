import { TaskInterface } from "./../types/task.interface";
import axiosInstance from "../../utils/axiosInstance";

export const getTasks = async (
    boardId: string | undefined
): Promise<TaskInterface[]> => {
    return axiosInstance
        .get(`/boards/${boardId}/tasks`)
        .then((res) => res.data)
        .catch((error) => {
            // Handle the error here
            throw new Error("Error retrieving tasks: " + error.message);
        });
};
