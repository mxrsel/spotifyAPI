import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Artist} from "../../types.ts";

export const fetchArtist = createAsyncThunk<Artist[], void>(
    'artists/fetchArtist',
    async() => {
    const response = await axiosApi<Artist[]>('/artists');
    return response.data || []
    })