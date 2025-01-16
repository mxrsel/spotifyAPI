import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Album, ApiAlbum} from "../../../types.ts";
import {
    addAlbum,
    getAlbumById,
    getAllAlbums,
    getArtistAlbumsById,
} from "../../thunks/albumThunk/albumThunk.ts";

interface AlbumProps {
    albums: Album[];
    oneAlbum: ApiAlbum | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: AlbumProps = {
    albums: [],
    oneAlbum: null,
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
                getArtistAlbumsById.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getArtistAlbumsById.fulfilled, (state,action) => {
                    state.isLoading = false;
                    state.albums = action.payload
                }
            )
            .addCase(
                getArtistAlbumsById.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
})

export const albumReducer = albumSlice.reducer