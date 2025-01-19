import {createSlice} from "@reduxjs/toolkit";
import {CompositionHistoryTypes} from "../../../types.ts";
import {addCompositionToHistory, getUserHistory} from "../../thunks/compositionHistoryThunk/compositionHistoryThunk.ts";

interface Props {
    compositionHistory: CompositionHistoryTypes[],
    isLoading: boolean;
    isError: boolean
}

const initialState: Props = {
    compositionHistory: [],
    isLoading: false,
    isError: false,
}

const compositionHistorySlice = createSlice({
    name: 'histories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getUserHistory.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getUserHistory.fulfilled, (state, {payload: userHistory}) => {
                    state.isLoading = false;
                    state.compositionHistory = userHistory;
                }
            )
            .addCase(
                getUserHistory.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
            .addCase(
                addCompositionToHistory.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                addCompositionToHistory.fulfilled, (state) => {
                    state.isLoading = false;
                }
            )
            .addCase(
                addCompositionToHistory.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
});

export const compositionHistoryReducer = compositionHistorySlice.reducer