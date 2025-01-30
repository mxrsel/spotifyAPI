import {createSlice} from "@reduxjs/toolkit";
import {Artist} from "../../types.ts";
import {deleteAdminArtist, getAllArtistsForAdmin} from "./artistAdminThunk.ts";


interface ArtistAdminProps {
    artists: Artist[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: ArtistAdminProps = {
    artists: [],
    isLoading: false,
    isError: false
}

const artistAdminSlice = createSlice({
    name: 'admin/artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllArtistsForAdmin.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                getAllArtistsForAdmin.fulfilled, (state, {payload: artists}) => {
                    state.isLoading = false;
                    state.artists = artists;
                }
            )
            .addCase(
                getAllArtistsForAdmin.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
            .addCase(
                deleteAdminArtist.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                deleteAdminArtist.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.artists = state.artists.filter((artist) => artist._id !== action.meta.arg);
                }
            )
            .addCase(
                deleteAdminArtist.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
});

export const artistAdminReducer = artistAdminSlice.reducer