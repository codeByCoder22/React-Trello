import React from "react";
import { useParams } from "react-router-dom";

export const TaskModal = () => {
    const { boardId, taskId } = useParams();
    return (
        <div>
            TaskModal
            <div>boardId: {boardId}</div>
            <div>taskId: {taskId}</div>
        </div>
    );
};
