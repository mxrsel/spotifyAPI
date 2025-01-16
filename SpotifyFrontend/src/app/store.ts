import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/slices/artistSlice/artistSlice.ts";
import {compositionReducer} from "../store/slices/compositionSlice/compositionSlice.ts";
import {userReducer} from "../store/slices/userSlice/userSlice.ts";
import {albumReducer} from "../store/slices/albumSlice/albumSlice.ts";

export const store = configureStore({
    reducer: {
        artists: artistReducer,
        albums: albumReducer,
        compositions: compositionReducer,
        users: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

