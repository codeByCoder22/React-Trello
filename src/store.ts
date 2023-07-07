import {
    configureStore,
    getDefaultMiddleware,
    combineReducers,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";
import { boardSlice } from "./boardSlice";

export const store = configureStore({
    reducer: {
        board: boardSlice.reducer,
    },
});
