import React from "react";
import { useEffect, useState } from "react";
import * as boardsService from "../shared/services/boards.service";
import { BoardInterface } from "../shared/types/board.interface";

export const Boards = () => {
    const [boards, setBoards] = useState<BoardInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        boardsService
            .getBoards()
            .then((boards) => {
                console.log("response.data", boards);
                setBoards(boards);
            })
            .catch((error) => {
                console.error("Error fetching boards:", error);
                setError(error.response?.data?.error);
            });
    }, []);

    return (
        <>
            <h1>Boards</h1>
            <ul>
                {boards.map((board) => (
                    <li key={board.id}>{board.title}</li>
                ))}
            </ul>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    );
};
