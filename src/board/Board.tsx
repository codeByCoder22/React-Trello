import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";
import * as boardsService from "../shared/services/boards.service";
import * as columnService from "../shared/services/columns.service";
import { selectBoard, selectColumns } from "../boardSlice";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, setColumns } from "../boardSlice";

export const Board = () => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard);
    const columns = useSelector(selectColumns);

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
        socketService.emit(SocketEventsEnum.boardsJoin, boardId);
        fetchData();
        return () => {
            // socketService.emit(SocketEventsEnum.boardsLeave, boardId);
            console.log("leaving board");
            boardService.leaveBoard(boardId);
            dispatch(setBoard(null));
        };
    }, [boardId]);

    return (
        <>
            <h1>Board</h1>
            <Link to="/boards">Back to boards</Link>
            <br />
            {board && (
                <>
                    <h2>{board.title}</h2>
                </>
            )}
            Board ID: {boardId}
        </>
    );
};
