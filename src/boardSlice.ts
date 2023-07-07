import { BoardInterface } from "./shared/types/board.interface";
import { ColumnInterface } from "./shared/types/column.interface";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    board: BoardInterface | null;
    column: ColumnInterface | null;
}

const initialState: BoardState = {
    board: null,
    column: null,
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<BoardInterface | null>) => {
            state.board = action.payload;
        },
        setColumn: (state, action: PayloadAction<ColumnInterface | null>) => {
            state.column = action.payload;
        },
    },
});

export const { setBoard } = boardSlice.actions;
export const { setColumn } = boardSlice.actions;

export default boardSlice.reducer;

export const selectBoard = (state: { board: BoardState }) => state.board.board;
export const selectColumn = (state: { board: BoardState }) =>
    state.board.column;
