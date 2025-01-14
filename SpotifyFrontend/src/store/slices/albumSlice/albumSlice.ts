import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Album, ApiAlbum, ApiArtist} from "../../../types.ts";
import {addAlbum, getAlbumById, getAllAlbums, getArtistById} from "../../thunks/albumThunk/albumThunk.ts";

interface AlbumProps {
    albums: Album[];
    oneAlbum: ApiAlbum | null;
    oneArtist: ApiArtist | null
    isLoading: boolean;
    isError: boolean;
}

const initialState: AlbumProps = {
    albums: [],
    oneAlbum: null,
    oneArtist: null,
    isLoading: false,
    isError: false
}

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllAlbums.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllAlbums.fulfilled, (state, {payload: albums}) => {
                    state.isLoading = false;
                    state.albums = albums
                }
            )
            .addCase(
                getAllAlbums.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                addAlbum.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                addAlbum.fulfilled, (state) => {
                    state.isLoading = false
                }
            )
            .addCase(
                addAlbum.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                getAlbumById.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                getAlbumById.fulfilled, (state, action: PayloadAction<ApiAlbum | null>) => {
                    state.isLoading = false;
                    state.oneAlbum = action.payload;
                }
            )
            .addCase(
                getAlbumById.rejected, (state) => {
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
            .addCase(
                getArtistById.fulfilled, (state, action: PayloadAction<ApiArtist | null>) => {
                    state.isLoading = false;
                    state.oneArtist = action.payload
                }
            )
            .addCase(
                getArtistById.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
})

export const albumReducer = albumSlice.reducer