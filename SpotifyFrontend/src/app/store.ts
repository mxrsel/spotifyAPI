import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/slices/artistSlice/artistSlice.ts";
import {compositionReducer} from "../store/slices/compositionSlice/compositionSlice.ts";
import {userReducer} from "../store/slices/userSlice/userSlice.ts";

export const store = configureStore({
    reducer: {
        artist: artistReducer,
        album: artistReducer,
        composition: compositionReducer,
        user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

