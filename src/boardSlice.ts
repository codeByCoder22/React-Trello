import { BoardInterface } from "./shared/types/board.interface";
import { ColumnInterface } from "./shared/types/column.interface";
import { TaskInterface } from "./shared/types/task.interface";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    board: BoardInterface | null;
    columns: ColumnInterface[] | null;
    tasks: TaskInterface[] | null;
}

const initialState: BoardState = {
    board: null,
    columns: null,
    tasks: null,
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<BoardInterface | null>) => {
            state.board = action.payload;
        },
        setColumns: (
            state,
            action: PayloadAction<ColumnInterface[] | null>
        ) => {
            state.columns = action.payload;
        },
        setTasks: (state, action: PayloadAction<TaskInterface[] | null>) => {
            state.tasks = action.payload;
        },
    },
});

export const { setBoard } = boardSlice.actions;
export const { setColumns } = boardSlice.actions;
export const { setTasks } = boardSlice.actions;

export default boardSlice.reducer;

export const selectBoard = (state: { board: BoardState }) => state.board.board;
export const selectColumns = (state: { board: BoardState }) =>
    state.board.columns;
export const selectTasks = (state: { board: BoardState }) => state.board.tasks;
