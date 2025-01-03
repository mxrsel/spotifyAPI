import {createSlice} from "@reduxjs/toolkit";
import {Artist} from "../../types.ts";
import {fetchArtist} from "../thunks/artistThunk.ts";

interface ArtistSliceState {
    artists: Artist[];
    isLoading: boolean
    isError: boolean
}

const initialState: ArtistSliceState = {
    artists: [],
    isLoading: false,
    isError: false
}

const artistSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchArtist.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                fetchArtist.fulfilled, (state, {payload: artists}) => {
                    state.isLoading = false;
                    state.artists = artists;
                }
            )
            .addCase(
                fetchArtist.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
})

export const artistReducer = artistSlice.reducer