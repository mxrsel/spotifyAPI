import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApiAlbum, Composition} from "../../../types.ts";
import {addComposition, getAlbumById, getAllCompositions} from "../../thunks/compositionThunk/compositionThunk.ts";

interface CompositionProps {
    compositions: Composition[];
    album: ApiAlbum | null;
    isLoading: boolean;
    isError: boolean
}

const initialState: CompositionProps = {
    compositions: [],
    album: null,
    isLoading: false,
    isError: false
}

const compositionSlice = createSlice({
    name: 'compositions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllCompositions.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllCompositions.fulfilled, (state, {payload: compositions}) => {
                    state.isLoading = false;
                    state.compositions = compositions
                }
            )
            .addCase(
                getAllCompositions.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                addComposition.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                addComposition.fulfilled, (state) => {
                    state.isLoading = false;
                }
            )
            .addCase(
                addComposition.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                getAlbumById.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAlbumById.fulfilled, (state, action: PayloadAction<ApiAlbum | null>) => {
                    state.isLoading = false;
                    state.album = action.payload;
                }
            )
            .addCase(
                getAlbumById.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const compositionReducer = compositionSlice.reducer;