import React from "react";
import { useParams, Link } from "react-router-dom";

export const Board = () => {
    const { boardId } = useParams();
    return (
        <>
            <h1>Board</h1>
            <Link to="/boards">Back to boards</Link>
            <br />
            Board ID: {boardId}
        </>
    );
};
