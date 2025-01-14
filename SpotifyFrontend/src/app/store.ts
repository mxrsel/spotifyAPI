import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/slices/artistSlice/artistSlice.ts";

export const store = configureStore({
    reducer: {
        artist: artistReducer,
        album: artistReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

