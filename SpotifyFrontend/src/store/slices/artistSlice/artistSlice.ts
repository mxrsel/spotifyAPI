import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApiArtist, Artist} from "../../../types.ts";
import {addArtist, getAllArtists, getArtistById} from "../../thunks/artistThunk/artistThunk.ts";

interface ArtistProps {
    artists: Artist[];
    oneArtist: ApiArtist | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: ArtistProps = {
    artists: [],
    oneArtist: null,
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
                getAllArtists.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                getAllArtists.fulfilled, (state, {payload: artists}) => {
                    state.isLoading = false;
                    state.artists = artists;
                }
            )
            .addCase(
                getAllArtists.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
            .addCase(
                addArtist.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                addArtist.fulfilled, (state) => {
                    state.isLoading = false;
                }
            )
            .addCase(
                addArtist.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                getArtistById.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(getArtistById.fulfilled, (state, action: PayloadAction<ApiArtist | null>) => {
                state.isLoading = false;
                state.oneArtist = action.payload;
                }
            )
            .addCase(getArtistById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                }
            )
    }
});

export const artistReducer = artistSlice.reducer