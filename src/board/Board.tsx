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
    setColumn,
    selectTasks,
} from "../boardSlice";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, setColumns, setTasks } from "../boardSlice";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { BoardInterface } from "../shared/types/board.interface";
import { ColumnInterface } from "../shared/types/column.interface";
import { TaskInterface } from "../shared/types/task.interface";

export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const columns = useSelector(selectColumns);
    const tasks = useSelector(selectTasks);
    const navigate = useNavigate();

    const getTasksByColumn = (
        columnId: string,
        tasks: TaskInterface[]
    ): TaskInterface[] => {
        return tasks.filter((task) => task.columnId === columnId);
    };

    const updateBoardName = (boardName: string) => {
        boardsService.updateBoard(boardId, { title: boardName });
    };
    const updateColumnName = (columnId: string, columnName: string) => {
        columnService.updateColumn(boardId, columnId, { title: columnName });
    };

    const deleteBoard = () => {
        // if (confirm("Are you sure you want to delete this board?")) {
        if (window.confirm("Are you sure you want to delete this board?")) {
            boardsService.deleteBoard(boardId);
        }
    };

    const boardsUpdateSuccess = (board: BoardInterface) => {
        dispatch(setBoard(board));
    };

    const columnsUpdateSuccess = (column: ColumnInterface) => {
        dispatch(setColumn(column));
    };

    const boardsDeleteSuccess = (boardId: string) => {
        console.log("boardsDeleteSuccess", boardId);
        setBoard(null);
        navigate("/boards");
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
            columnsUpdateSuccess
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

    return (
        <>
            {board && (
                <div className="board">
                    <div className="board-header-container">
                        <InlineFormComponent
                            defaultText={board.title}
                            title={board.title}
                            handleSubmit={updateBoardName}
                        />
                        <div onClick={deleteBoard} className="delete-board">
                            Delete board
                        </div>
                    </div>
                    <hr />
                    <div className="columns">
                        {columns &&
                            columns.length > 0 &&
                            columns.map((column) => (
                                <div className="column" key={column.id}>
                                    <div className="column-title">
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
                                        <div>
                                            <ul>
                                                {getTasksByColumn(
                                                    column.id,
                                                    tasks ?? []
                                                ).map((task) => (
                                                    <li key={task.id}>
                                                        {task.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};
