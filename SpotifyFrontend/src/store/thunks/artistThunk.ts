import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Artist, ArtistMutation} from "../../types.ts";

export const fetchArtist = createAsyncThunk<Artist[], void>(
    'artists/fetchArtist',
    async() => {
    const response = await axiosApi<Artist[]>('/artists');
    return response.data || []
    });

export const addArtists = createAsyncThunk<void, ArtistMutation>(
    'artists/addArtist',
    async(artist) => {
        const formData = new FormData();

        const artistKeys = Object.keys(artist) as (keyof ArtistMutation)[];

        artistKeys.forEach((artistKey) => {
            const artistValue = artist[artistKey];
            if (artistValue !== null) {
               formData.append(artistKey, artistValue);
            }
        });

        await axiosApi.post('/artists', formData);
    }
)