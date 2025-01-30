import {createSlice} from "@reduxjs/toolkit";
import {Composition} from "../../types.ts";
import {deleteAdminComposition, getAllCompositionsForAdmin} from "./compositionAdminThunk.ts";

interface CompositionAdminProps {
    compositions: Composition[];
    isLoading: boolean;
    isError: boolean
}

const initialState: CompositionAdminProps = {
    compositions: [],
    isLoading: false,
    isError: false
}

const compositionAdminSlice = createSlice({
    name:
        '/admin/compositions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllCompositionsForAdmin.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllCompositionsForAdmin.fulfilled, (state, {payload: compositions}) => {
                    state.isLoading = false;
                    state.compositions = compositions
                }
            )
            .addCase(
                getAllCompositionsForAdmin.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                deleteAdminComposition.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                deleteAdminComposition.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.compositions = state.compositions.filter((composition) => composition._id !== action.meta.arg);
                }
            )
            .addCase(
                deleteAdminComposition.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
});

export const compositionAdminReducer = compositionAdminSlice.reducer;