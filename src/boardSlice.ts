import { BoardInterface } from "./shared/types/board.interface";
import { ColumnInterface } from "./shared/types/column.interface";
import { TaskInterface } from "./shared/types/task.interface";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    board: BoardInterface | null;
    columns: ColumnInterface[] | null;
    tasks: TaskInterface[] | null;
    currentTask: TaskInterface | null;
    deletedTaskID: string | null;
}

const initialState: BoardState = {
    board: null,
    columns: null,
    tasks: null,
    currentTask: null,
    deletedTaskID: null,
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
        changeColumnName: (
            state,
            action: PayloadAction<ColumnInterface | null>
        ) => {
            if (state.columns) {
                const index = state.columns.findIndex(
                    (column) => column.id === action.payload?.id
                );
                if (index !== -1) {
                    state.columns[index] = action.payload!;
                }
            }
        },
        updateTask: (state, action: PayloadAction<TaskInterface>) => {
            if (state.tasks) {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                    state.currentTask = action.payload;
                }
            }
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            if (state.columns) {
                const index = state.columns.findIndex(
                    (column) => column.id === action.payload
                );
                if (index !== -1) {
                    state.columns.splice(index, 1);
                }
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            if (state.tasks) {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload
                );
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
            }
        },
        createColumn: (state, action: PayloadAction<ColumnInterface>) => {
            if (state.columns) {
                state.columns.push(action.payload);
            }
        },

        setTasks: (state, action: PayloadAction<TaskInterface[] | null>) => {
            state.tasks = action.payload;
        },
        createTask: (state, action: PayloadAction<TaskInterface>) => {
            if (state.tasks) {
                state.tasks.push(action.payload);
            }
        },
        setCurrentTask: (
            state,
            action: PayloadAction<TaskInterface | null>
        ) => {
            state.currentTask = action.payload;
        },
        setDeletedTaskID: (state, action: PayloadAction<string | null>) => {
            state.deletedTaskID = action.payload;
        },
    },
});

export const { setBoard } = boardSlice.actions;
export const {
    setColumns,
    changeColumnName,
    createColumn,
    deleteColumn,
    deleteTask,
    setDeletedTaskID,
} = boardSlice.actions;
export const { setTasks, createTask, setCurrentTask, updateTask } =
    boardSlice.actions;

export default boardSlice.reducer;

export const selectBoard = (state: { board: BoardState }) => state.board.board;
export const selectColumns = (state: { board: BoardState }) =>
    state.board.columns;
export const selectTasks = (state: { board: BoardState }) => state.board.tasks;
export const selectCurrentTask = (state: { board: BoardState }) =>
    state.board.currentTask;
export const selectDeletedTaskID = (state: { board: BoardState }) =>
    state.board.deletedTaskID;
