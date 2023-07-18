import { TaskInterface } from "./../types/task.interface";
import axiosInstance from "../../utils/axiosInstance";
import { TaskInputInterface } from "../types/taskInput.interface";
import * as socketService from "./socket.service";
import { SocketEventsEnum } from "../types/socketEvents.enum";

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

export const createTask = async (taskInput: TaskInputInterface) => {
    socketService.emit(SocketEventsEnum.tasksCreate, taskInput);
};

export const updateTask = async (
    boardId: string | undefined,
    taskId: string | undefined,
    fields: { title?: string; description?: string; columnId?: string }
) => {
    socketService.emit(SocketEventsEnum.tasksUpdate, {
        boardId,
        taskId,
        fields,
    });
};

export const deleteTask = (boardId: string, taskId: string) => {
    socketService.emit(SocketEventsEnum.tasksDelete, { boardId, taskId });
};
