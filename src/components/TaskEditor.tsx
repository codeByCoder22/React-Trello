import React, { MouseEventHandler } from "react";
import classes from "./TaskEditor.module.css";

interface TaskEditorProps {
    closeEditor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({ closeEditor }) => {
    const handleCloseEditor: MouseEventHandler<HTMLButtonElement> = () => {
        closeEditor(false);
    };
    return (
        <>
            <div className={classes.blur}>
                <div className={classes.taskeditor}>
                    <h1>TaskEditor</h1>
                    <button onClick={handleCloseEditor}>Close</button>
                </div>
            </div>
        </>
    );
};
