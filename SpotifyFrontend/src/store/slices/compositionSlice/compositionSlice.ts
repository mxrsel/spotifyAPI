import {createSlice} from "@reduxjs/toolkit";
import {Composition} from "../../../types.ts";
import {addComposition, getCompositionsByAlbum, getAllCompositions} from "../../thunks/compositionThunk/compositionThunk.ts";

interface CompositionProps {
    compositions: Composition[];
    isLoading: boolean;
    isError: boolean
}

const initialState: CompositionProps = {
    compositions: [],
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
                getCompositionsByAlbum.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getCompositionsByAlbum.fulfilled, (state, {payload: albumComposition}) => {
                    state.isLoading = false;
                    state.compositions = albumComposition
                }
            )
            .addCase(
                getCompositionsByAlbum.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const compositionReducer = compositionSlice.reducer;