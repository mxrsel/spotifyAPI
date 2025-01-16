import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiArtist, Artist, ArtistMutation} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";

export const getAllArtists = createAsyncThunk<Artist[], void>(
    'artists/getAllArtists',
    async() => {
        const response = await axiosApi<Artist[]>('/artists');
        return response.data || []
    }
);

export const addArtist = createAsyncThunk<void, ArtistMutation>(
    'artists/addArtist',
    async(artist) => {
        const formData = new FormData();

        const artistKeys = Object.keys(artist) as (keyof ArtistMutation)[];

        artistKeys.forEach((artistKey) => {
            const artistValue = artist[artistKey];

            if(artistValue !== null) {
                formData.append(artistKey, artistValue);
            }
        });

        await axiosApi.post('/artists', formData);
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