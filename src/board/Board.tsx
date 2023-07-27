import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";
import * as boardsService from "../shared/services/boards.service";
import * as columnService from "../shared/services/columns.service";
import * as tasksService from "../shared/services/tasks.service";
import {
    setCurrentTask,
    updateTask,
    selectBoard,
    changeColumnName,
    setBoard,
    setColumns,
    createColumn,
    deleteColumn,
    setTasks,
    createTask,
    deleteTask,
    setDeletedTaskID,
} from "../boardSlice";
import { useSelector, useDispatch } from "react-redux";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { BoardInterface } from "../shared/types/board.interface";
import { ColumnInterface } from "../shared/types/column.interface";
import { TaskInterface } from "../shared/types/task.interface";
import classes from "./Board.module.css";

// icons :css.gg
import { CgCornerUpLeft, CgTrash } from "react-icons/cg";
import { TaskEditor } from "../components/TaskEditor";
import { Columns } from "../components/Columns";

export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const updateBoardName = (boardName: string) => {
        boardsService.updateBoard(boardId, { title: boardName });
    };

    const showTaskEditor = (currentTask: TaskInterface) => {
        dispatch(setCurrentTask(currentTask));
        setIsModalOpen(true);
        console.log("handleShowModalComponent:", currentTask);
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

    const taskUpdateSuccess = (task: TaskInterface) => {
        console.log("taskUpdateSuccess", task);
        dispatch(updateTask(task));
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

    const DeleteTaskSuccess = (taskId: string) => {
        dispatch(deleteTask(taskId));
        dispatch(setDeletedTaskID(taskId));
    };

    function fetchData(): void {
        boardsService
            .getBoard(boardId)
            .then((board) => {
                console.log("board:", board);
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

        socketService.listen(
            SocketEventsEnum.tasksUpdateSuccess,
            taskUpdateSuccess
        );

        socketService.listen(
            SocketEventsEnum.tasksDeleteSuccess,
            DeleteTaskSuccess
        );

        return () => {
            console.log("leaving__board");
            console.log("board_id", boardId);
            boardService.leaveBoard(boardId);
            dispatch(setBoard(null));
            socketService.socketRemoveAllListeners();
        };
    }, []);

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
                        <Columns showTaskEditor={showTaskEditor} />
                    </div>
                </div>
            )}
            {isModalOpen && <TaskEditor closeEditor={setIsModalOpen} />}
        </>
    );
};
