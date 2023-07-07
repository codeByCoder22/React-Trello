import React, {
    createContext,
    useContext,
    FC,
    PropsWithChildren,
    useState,
} from "react";

import { BoardInterface } from "../../shared/types/board.interface";

interface BoardContextType {
    board: BoardInterface | null;
    setBoard: (board: BoardInterface | null) => void;
}

const BoardContext = createContext<BoardContextType | null>(null);

export const useBoardContext = (): BoardContextType => {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error("useBoardContext must be used within an BoardProvider");
    }
    return context;
};

export const BoardProvider: FC<
    PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children }) => {
    const [board, setBoard] = useState<BoardInterface | null>(null);

    const boardContextValue: BoardContextType = {
        board,
        setBoard,
    };

    return (
        <BoardContext.Provider value={boardContextValue}>
            {children}
        </BoardContext.Provider>
    );
};
