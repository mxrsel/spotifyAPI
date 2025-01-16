import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation, ApiAlbum} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";

export const getAllAlbums = createAsyncThunk<Album[], void>(
    'albums/getAllAlbums',
    async() => {
        const response = await axiosApi<Album[]>('/albums');
        return response.data || []
    }
);

export const addAlbum = createAsyncThunk<void, AlbumMutation>(
    'albums/addAlbum',
    async(album) => {
        const formData = new FormData();

        const albumKeys = Object.keys(album) as (keyof AlbumMutation)[];

        albumKeys.forEach((albumKey) => {
            const albumValue = album[albumKey];

            if(albumValue !== null) {
                formData.append(albumKey, albumValue.toString());
            }
        });
        await axiosApi.post('/albums', formData);
    }
);

export const getAlbumById = createAsyncThunk<ApiAlbum | null, string>(
    'albums/getAlbumById',
    async(albumId) => {
        const response = await axiosApi.get<ApiAlbum | null>(`/albums/${albumId}`);
        if(!response.data) return null;

        return response.data;
    }
);

export const getArtistAlbumsById = createAsyncThunk(
    'albums/getArtistById',
    async(artistId: string) => {
        const response = await axiosApi.get<Album[]>(`/albums?artistId=${artistId}`);
        console.log(response.data);
        return response.data.sort((firstReleased, lastReleased) => firstReleased .released - lastReleased.released);
    }
)