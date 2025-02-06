import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation, ApiAlbum} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const getAllAlbums = createAsyncThunk<Album[], void>(
    'albums/getAllAlbums',
    async() => {
        const response = await axiosApi<Album[]>('/albums');
        return response.data || []
    }
);

export const addAlbum = createAsyncThunk<void, AlbumMutation, {state: RootState}>(
    'albums/addAlbum',
    async(album, {getState}) => {
        const token = getState().users.user?.token
        const formData = new FormData();

        formData.append('name', album.name);
        formData.append('artist', album.artist);
        formData.append('released', String(album.released));


        if (album.albumImage) {
            formData.append('albumImage', album.albumImage);
        }

        if (album.isPublished) {
            formData.append('isPublished', String(album.isPublished));
        }
        await axiosApi.post('/albums', formData, {
            headers: {Authorization: token}
        });
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
        const response = await axiosApi.get<Album[]>(`/albums/${artistId}/albums`);
        console.log(response.data);
        return response.data.sort((firstReleased, lastReleased) => firstReleased .released - lastReleased.released);
    }
)