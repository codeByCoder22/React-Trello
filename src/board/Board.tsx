import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";
import * as boardsService from "../shared/services/boards.service";
import * as columnService from "../shared/services/columns.service";
import { selectBoard, selectColumns } from "../boardSlice";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, setColumns } from "../boardSlice";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { BoardInterface } from "../shared/types/board.interface";

export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const columns = useSelector(selectColumns);

    const updateBoardName = (boardName: string) => {
        boardsService.updateBoard(boardId, { title: boardName });
    };

    const deleteBoard = () => {
        // if (confirm("Are you sure you want to delete this board?")) {
        if (window.confirm("Are you sure you want to delete this board?")) {
            boardsService.deleteBoard(boardId);
        }
    };

    const [test, setTest] = useState<string>("");

    const boardsUpdateSuccess = (board: BoardInterface) => {
        dispatch(setBoard(board));
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
            <p>{test}</p>
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
                    <div className="columns">
                        {columns &&
                            columns.length > 0 &&
                            columns.map((column) => (
                                <div className="column" key={column.id}>
                                    <div className="column-title">
                                        {column.title}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};
