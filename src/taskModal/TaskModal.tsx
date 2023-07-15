import React from "react";
import { useParams } from "react-router-dom";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { useSelector, useDispatch } from "react-redux";
import {
    selectBoard,
    selectColumns,
    changeColumnName,
    selectTasks,
    setBoard,
    setColumns,
    createColumn,
    deleteColumn,
    setTasks,
    createTask,
} from "../boardSlice";
import * as tasksService from "../shared/services/tasks.service";

export const TaskModal = () => {
    const { boardId, taskId } = useParams();

    const tasks = useSelector(selectTasks);

    const getTaskById = (id: string | undefined) => {
        return tasks?.find((task) => task.id === id);
    };

    const task = getTaskById(taskId);

    const updateTaskName = (taskName: string) => {
        tasksService.updateTask(boardId, taskId, { title: taskName });
    };

    return (
        <div>
            TaskModal
            <div>boardId: {boardId}</div>
            <div>taskId: {taskId}</div>
            <InlineFormComponent
                defaultText={task?.title}
                title={task?.title}
                handleSubmit={updateTaskName}
            />
        </div>
    );
};
