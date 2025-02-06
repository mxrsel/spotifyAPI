import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiArtist, Artist, ArtistMutation} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const getAllArtists = createAsyncThunk<Artist[], void>(
    'artists/getAllArtists',
    async() => {
        const response = await axiosApi<Artist[]>('/artists');
        return response.data || []
    }
);

export const addArtist = createAsyncThunk<void, ArtistMutation, {state: RootState}>(
    'artists/addArtist',
    async(artist, {getState}) => {
        const token = getState().users.user?.token
        const formData = new FormData();

       formData.append('name', artist.name);
       if (artist.artistBio) {
           formData.append('artistBio', artist.artistBio);
       }

        if (artist.artistImage) {
            formData.append('artistImage', artist.artistImage);
        }

        if (artist.isPublished) {
            formData.append('isPublished', String(artist.isPublished));
        }

        await axiosApi.post('/artists', formData, {
            headers: {Authorization: token}
        });
    }
);

export const getArtistById = createAsyncThunk<ApiArtist | null, string>(
    'artists/getArtistById',
    async(artistId) => {
        const response = await axiosApi.get<ApiArtist | null>(`/albums?artist=${artistId}`);
        if (!response.data) return null;
        return response.data;
    }
)