import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/slices/artistSlice/artistSlice.ts";
import {compositionReducer} from "../store/slices/compositionSlice/compositionSlice.ts";
import {userReducer} from "../store/slices/userSlice/userSlice.ts";
import {albumReducer} from "../store/slices/albumSlice/albumSlice.ts";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {compositionHistoryReducer} from "../store/slices/compositionHistorySlice/compositionHistorySlice.ts";

const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    artists: artistReducer,
    albums: albumReducer,
    compositions: compositionReducer,
    histories: compositionHistoryReducer,
    users: persistReducer(usersPersistConfig, userReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

