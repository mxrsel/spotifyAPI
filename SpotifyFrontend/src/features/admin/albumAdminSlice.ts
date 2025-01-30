import {createSlice} from "@reduxjs/toolkit";
import {Album} from "../../types.ts";
import {deleteAdminAlbum, getAllAlbumsForAdmin} from "./albumAdminThunk.ts";


interface AlbumADminProps {
    albums: Album[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: AlbumADminProps = {
    albums: [],
    isLoading: false,
    isError: false
}

const albumAdminSlice = createSlice({
    name: 'admin/albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllAlbumsForAdmin.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllAlbumsForAdmin.fulfilled, (state, {payload: albums}) => {
                    state.isLoading = false;
                    state.albums = albums
                }
            )
            .addCase(
                getAllAlbumsForAdmin.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                deleteAdminAlbum.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                deleteAdminAlbum.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.albums = state.albums.filter((album) => album._id !== action.meta.arg);
                }
            )
            .addCase(
                deleteAdminAlbum.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
})

export const albumAdminReducer = albumAdminSlice.reducer