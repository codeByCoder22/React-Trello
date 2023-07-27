import React from "react";
import classes from "./Columns.module.css";
import { ColumnInputInterface } from "../shared/types/columnInput.interface";

import { useSelector, useDispatch } from "react-redux";

import { selectColumns, selectTasks } from "../boardSlice";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import * as tasksService from "../shared/services/tasks.service";
import { useParams } from "react-router-dom";
import * as columnService from "../shared/services/columns.service";
import { TaskInterface } from "../shared/types/task.interface";
import { TaskInputInterface } from "../shared/types/taskInput.interface";

import { CgTrash } from "react-icons/cg";

interface ColumnsProps {
    showTaskEditor: (currentTask: TaskInterface) => void;
}

export const Columns: React.FC<ColumnsProps> = ({ showTaskEditor }) => {
    const { boardId } = useParams();

    const columns = useSelector(selectColumns);
    const tasks = useSelector(selectTasks);

    const getTasksByColumn = (
        columnId: string,
        tasks: TaskInterface[]
    ): TaskInterface[] => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    const updateColumnName = (columnId: string, columnName: string) => {
        columnService.updateColumn(boardId, columnId, { title: columnName });
    };

    const handleDeleteColumn = (columnId: string) => {
        if (window.confirm("Are you sure you want to delete this column?")) {
            columnService.deleteColumn(boardId, columnId);
        }
    };

    const handleCreateTask = (columnId: string, title: string) => {
        const taskInput: TaskInputInterface = {
            title,
            columnId,
            boardId,
        };
        tasksService.createTask(taskInput);
    };

    const handleCreateColumn = (title: string) => {
        const columnInput: ColumnInputInterface = {
            title,
            boardId: boardId,
        };
        columnService.createColumn(columnInput);
    };

    return (
        <>
            {columns &&
                columns.length > 0 &&
                columns.map((column) => (
                    <div className={classes.column} key={column.id}>
                        <div className={classes.column_title}>
                            <InlineFormComponent
                                defaultText={column.title}
                                title={column.title}
                                handleSubmit={(columnName) =>
                                    updateColumnName(column.id, columnName)
                                }
                            />

                            <CgTrash
                                className={classes.css_gg_icon}
                                onClick={() => handleDeleteColumn(column.id)}
                            />
                        </div>

                        <div>
                            {getTasksByColumn(column.id, tasks ?? []).map(
                                (task) => (
                                    <div
                                        className={classes.task}
                                        key={task.id}
                                        onClick={() => showTaskEditor(task)}
                                    >
                                        {task.title}
                                    </div>
                                )
                            )}

                            <InlineFormComponent
                                defaultText="Add new task"
                                handleSubmit={(taskName) =>
                                    handleCreateTask(column.id, taskName)
                                }
                            />
                        </div>
                    </div>
                ))}
            <div className={classes.column}>
                <InlineFormComponent
                    defaultText="Create new column"
                    handleSubmit={handleCreateColumn}
                />
            </div>
        </>
    );
};
