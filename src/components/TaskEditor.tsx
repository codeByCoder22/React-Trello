import React, { MouseEventHandler, useRef, useEffect } from "react";
import classes from "./TaskEditor.module.css";

import { useSelector, useDispatch } from "react-redux";

import {
    selectCurrentTask,
    setCurrentTask,
    selectColumns,
    selectDeletedTaskID,
} from "../boardSlice";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import * as tasksService from "../shared/services/tasks.service";
import { useParams } from "react-router-dom";

import { CgClose, CgTrash } from "react-icons/cg";
import useClickOutside from "../utils/useClickOutside";

interface TaskEditorProps {
    closeEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({ closeEditor }) => {
    const handleCloseEditor: MouseEventHandler<SVGElement> = () => {
        closeEditor(false);
    };
    const { boardId } = useParams();
    const columns = useSelector(selectColumns);
    const optionRef = useRef<HTMLSelectElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const deletedTaskID = useSelector(selectDeletedTaskID);
    const currentTask = useSelector(selectCurrentTask);

    useClickOutside(editorRef, () => {
        closeEditor(false);
    });

    const handleUpdateTaskName = (taskName: string) => {
        tasksService.updateTask(boardId, currentTask!.id, { title: taskName });
    };

    const handleDeleteTask = (taskId: string | undefined) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            tasksService.deleteTask(boardId, taskId);
            closeEditor(false);
        }
    };

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOption = event.target.value;
        // Do something with the selected option value
        console.log(selectedOption);
        tasksService.updateTask(boardId, currentTask!.id, {
            columnId: selectedOption,
        });
    };
    const handleUpdateTaskDescription = (Description: string) => {
        console.log("handleUpdateTaskDescription:", Description);
        tasksService.updateTask(boardId, currentTask!.id, {
            description: Description,
        });
    };

    useEffect(() => {
        if (currentTask) {
            if (optionRef.current) {
                optionRef.current.value = currentTask!.columnId;
            }
            /**************** */
            dispatch(setCurrentTask(currentTask));
            console.log("useEffect_currentTask ID :", currentTask?.id);
            console.log("deletedTaskID :", deletedTaskID);
        }
        if (currentTask?.id === deletedTaskID) {
            closeEditor(false);
        }
    }, [currentTask, deletedTaskID]);

    return (
        <>
            <div className={classes.blur}>
                <div className={classes.taskeditor} ref={editorRef}>
                    <div className={classes.taskeditor_header}>
                        <CgClose
                            className={classes.cloSvg}
                            onClick={handleCloseEditor}
                        />
                        <span>Task Editor</span>
                        {/* <span>Click to edit</span> */}
                    </div>
                    <div className={classes.taskeditor_body}>
                        <div className={classes.taskeditor_row}>
                            <InlineFormComponent
                                defaultText={currentTask?.title}
                                title={currentTask?.title}
                                handleSubmit={handleUpdateTaskName}
                            />
                            <div className={classes.trashSvg}>
                                <CgTrash
                                    onClick={() =>
                                        handleDeleteTask(currentTask?.id)
                                    }
                                />
                            </div>
                        </div>
                        <div className={classes.taskeditor_row}>
                            <p className={classes.des_label}>Description:</p>
                            <select
                                onChange={handleOptionChange}
                                id="task_select"
                                className={classes.option}
                                ref={optionRef}
                            >
                                {columns?.map((column) => (
                                    <option value={column.id} key={column.id}>
                                        {column.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={classes.taskeditor_row}>
                            <InlineFormComponent
                                defaultText={
                                    currentTask?.description ||
                                    "Add more details..."
                                }
                                title={currentTask?.description}
                                inputType="textarea"
                                hasButton
                                buttonText="Save"
                                handleSubmit={handleUpdateTaskDescription}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
