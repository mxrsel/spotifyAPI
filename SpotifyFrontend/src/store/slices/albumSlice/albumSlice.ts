import {createSlice} from "@reduxjs/toolkit";
import {Album, ApiAlbum} from "../../../types.ts";

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
    reducers: {}
})

export const albumReducer = albumSlice.reducer