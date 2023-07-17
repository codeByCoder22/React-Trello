import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";
import * as boardsService from "../shared/services/boards.service";
import * as columnService from "../shared/services/columns.service";
import * as tasksService from "../shared/services/tasks.service";
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
import { useSelector, useDispatch } from "react-redux";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { BoardInterface } from "../shared/types/board.interface";
import { ColumnInterface } from "../shared/types/column.interface";
import { TaskInterface } from "../shared/types/task.interface";
import classes from "./Board.module.css";
import modalCls from "./TaskDialog.module.css";
import { ColumnInputInterface } from "../shared/types/columnInput.interface";
import { TaskInputInterface } from "../shared/types/taskInput.interface";
// icons :css.gg
import { CgClose, CgCornerUpLeft, CgTrash } from "react-icons/cg";

export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const columns = useSelector(selectColumns);
    const tasks = useSelector(selectTasks);
    const navigate = useNavigate();

    // #region Task Dialog Functions

    const [outputValue, setOutputValue] = useState<string>("");

    const handleShowDialog = () => {
        const favDialog = document.getElementById(
            "favDialog"
        ) as HTMLDialogElement;
        favDialog.showModal();
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const confirmBtn = document.getElementById(
            "confirmBtn"
        ) as HTMLButtonElement;
        confirmBtn.value = event.target.value;
    };

    const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const favDialog = document.getElementById(
            "favDialog"
        ) as HTMLDialogElement;
        const selectEl = favDialog.querySelector("select") as HTMLSelectElement;
        favDialog.close(selectEl.value);
    };

    const handleDialogClose = (
        event: React.SyntheticEvent<HTMLDialogElement>
    ) => {
        const favDialog = document.getElementById(
            "favDialog"
        ) as HTMLDialogElement;
        setOutputValue(
            favDialog.returnValue === "default"
                ? "No return value."
                : `ReturnValue: ${favDialog.returnValue}.`
        );
    };

    // #endregion

    const getTasksByColumn = (
        columnId: string,
        tasks: TaskInterface[]
    ): TaskInterface[] => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    const updateBoardName = (boardName: string) => {
        boardsService.updateBoard(boardId, { title: boardName });
    };

    const handleCreateColumn = (title: string) => {
        const columnInput: ColumnInputInterface = {
            title,
            boardId: boardId,
        };
        columnService.createColumn(columnInput);
    };

    const updateColumnName = (columnId: string, columnName: string) => {
        columnService.updateColumn(boardId, columnId, { title: columnName });
    };

    const deleteBoard = () => {
        // if (confirm("Are you sure you want to delete this board?")) {
        if (
            window.confirm(
                "Are you sure you want to delete this board ?\nAll columns and tasks will be deleted."
            )
        ) {
            boardsService.deleteBoard(boardId);
        }
    };

    const boardsUpdateSuccess = (board: BoardInterface) => {
        dispatch(setBoard(board));
    };

    const columnsCreateSuccess = (column: ColumnInterface) => {
        dispatch(createColumn(column));
    };
    const tasksCreateSuccess = (task: TaskInterface) => {
        dispatch(createTask(task));
    };

    const columnUpdateSuccess = (column: ColumnInterface) => {
        dispatch(changeColumnName(column));
    };
    const columnDeleteSuccess = (columnId: string) => {
        dispatch(deleteColumn(columnId));
        console.log("columnDeleteSuccess", columnId);
    };

    const boardsDeleteSuccess = (boardId: string) => {
        console.log("boardsDeleteSuccess", boardId);
        dispatch(setBoard(null));
        navigate("/boards");
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

    function fetchData(): void {
        boardsService
            .getBoard(boardId)
            .then((board) => {
                console.log("board:", board);
                // boardService.set_Board(board);
                dispatch(setBoard(board));
            })
            .catch((error) => {
                console.error("Error fetching board:", error);
            });
        columnService
            .getColumns(boardId)
            .then((columns) => {
                console.log("columns:", columns);
                dispatch(setColumns(columns));
            })
            .catch((error) => {
                console.error("Error fetching columns:", error);
            });
        tasksService
            .getTasks(boardId)
            .then((tasks) => {
                console.log("tasks:", tasks);
                dispatch(setTasks(tasks));
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }

    useEffect(() => {
        socketService.emit(SocketEventsEnum.boardsJoin, { boardId });
        fetchData();
        socketService.listen(
            // SocketEventsEnum.boardsUpdateSuccess,
            SocketEventsEnum.boardsUpdateSuccess,
            boardsUpdateSuccess
        );
        socketService.listen(
            SocketEventsEnum.boardsUpdateFailure,
            (error: string) => {
                console.error("boardsUpdateFailure", error);
            }
        );
        socketService.listen(
            SocketEventsEnum.boardsDeleteSuccess,
            boardsDeleteSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsUpdateSuccess,
            columnUpdateSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsDeleteSuccess,
            columnDeleteSuccess
        );
        socketService.listen(
            SocketEventsEnum.columnsCreateSuccess,
            columnsCreateSuccess
        );
        socketService.listen(
            SocketEventsEnum.tasksCreateSuccess,
            tasksCreateSuccess
        );

        return () => {
            console.log("leaving__board");
            console.log("board_id", boardId);
            boardService.leaveBoard(boardId);
            dispatch(setBoard(null));
            /*
            socketService.socketOff(
                "boards:updateSuccess",
                boardsUpdateSuccess
            );
            */
            socketService.socketRemoveAllListeners();
        };
    }, []);
    const dialogStyle = {
        backgroundColor: "#9F90EF",
        // border: "1 solid antiquewhite",
        borderRadius: "0.5rem",
        width: "50%",
        height: "40%",
    };
    return (
        <>
            {board && (
                <div className="board">
                    <div className={classes.board_header_container}>
                        <InlineFormComponent
                            defaultText={board.title}
                            title={board.title}
                            handleSubmit={updateBoardName}
                        />

                        <CgTrash
                            className={classes.css_gg_icon}
                            onClick={deleteBoard}
                        />
                        <CgCornerUpLeft
                            className={classes.css_gg_icon}
                            onClick={() => navigate("/boards")}
                        />
                    </div>
                    <div className={classes.columns}>
                        {columns &&
                            columns.length > 0 &&
                            columns.map((column) => (
                                <div className={classes.column} key={column.id}>
                                    <div className={classes.column_title}>
                                        <InlineFormComponent
                                            defaultText={column.title}
                                            title={column.title}
                                            handleSubmit={(columnName) =>
                                                updateColumnName(
                                                    column.id,
                                                    columnName
                                                )
                                            }
                                        />

                                        <CgTrash
                                            className={classes.css_gg_icon}
                                            onClick={() =>
                                                handleDeleteColumn(column.id)
                                            }
                                        />
                                    </div>

                                    <div>
                                        {getTasksByColumn(
                                            column.id,
                                            tasks ?? []
                                        ).map((task) => (
                                            <div
                                                className={classes.task}
                                                key={task.id}
                                                onClick={handleShowDialog}
                                            >
                                                {task.title}
                                            </div>
                                        ))}

                                        <InlineFormComponent
                                            defaultText="Add new task"
                                            handleSubmit={(taskName) =>
                                                handleCreateTask(
                                                    column.id,
                                                    taskName
                                                )
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
                    </div>
                </div>
            )}

            <dialog
                className={modalCls.dialog}
                id="favDialog"
                onClose={handleDialogClose}
                // style={dialogStyle}
            >
                <CgTrash />
                <CgClose />
                <form>
                    <p>
                        <label>
                            Favorite animal:
                            <select onChange={handleSelectChange}>
                                <option value="default">Choose…</option>
                                <option>Brine shrimp</option>
                                <option>Red panda</option>
                                <option>Spider monkey</option>
                            </select>
                        </label>
                    </p>
                    <div>
                        <button value="cancel" formMethod="dialog">
                            Cancel
                        </button>
                        <button
                            id="confirmBtn"
                            onClick={handleConfirmClick}
                            value="default"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </dialog>
            <output>{outputValue}</output>
        </>
    );
};
