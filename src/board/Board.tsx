import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import socketService from "../shared/services/socket.service";
import { SocketEventsEnum } from "../shared/types/socketEvents.enum";
import * as boardService from "../shared/services/board.service";

export const Board = () => {
    const { boardId } = useParams();

    useEffect(() => {
        socketService.emit(SocketEventsEnum.boardsJoin, boardId);
        return () => {
            // socketService.emit(SocketEventsEnum.boardsLeave, boardId);
            console.log("leaving board");
            boardService.leaveBoard(boardId);
        };
    }, [boardId]);

    return (
        <>
            <h1>Board</h1>
            <Link to="/boards">Back to boards</Link>
            <br />
            Board ID: {boardId}
        </>
    );
};
