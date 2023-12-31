import { useEffect, useState } from "react";
import * as boardsService from "../shared/services/boards.service";
import { BoardInterface } from "../shared/types/board.interface";
import InlineFormComponent from "../shared/components/InlineFormComponent";
import { Link } from "react-router-dom";
import classes from "./Boards.module.css";

export const Boards = () => {
    const [boards, setBoards] = useState<BoardInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createBoard = (title: string) => {
        setIsLoading(true);
        boardsService
            .createBoard(title)
            .then((board) => {
                setBoards([...boards, board]);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.response?.data?.error);
            });
    };

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
        <div className={classes.boards}>
            <h1>My Boards</h1>
            <div className={classes.flex_}>
                <div className={classes.inlineForm}>
                    <InlineFormComponent
                        defaultText="Create new board"
                        handleSubmit={createBoard}
                    />
                </div>

                {boards.map((board) => (
                    <Link
                        to={`/boards/${board.id}`}
                        key={board.id}
                        className="board-tile"
                    >
                        <div className="board-tile-details-name">
                            {board.title}
                        </div>
                    </Link>
                ))}

                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};
