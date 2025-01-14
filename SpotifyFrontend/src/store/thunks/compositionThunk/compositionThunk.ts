import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiAlbum, Composition, CompositionMutation} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";

export const getAllCompositions = createAsyncThunk<Composition[], void>(
    'compositions/getAllCompositions',
    async () => {
        const response = await axiosApi<Composition[]>('/compositions');
        return response.data || [];
    }
);

export const addComposition = createAsyncThunk<void, CompositionMutation>(
    'compositions/addComposition',
    async(composition) => {
        await axiosApi.post('/compositions.json', {...composition});
    }
);

export const getAlbumById = createAsyncThunk<ApiAlbum | null, string>(
    'compositions/getAlbumId',
    async(albumId) => {
        const response = await axiosApi.get('/compositions',
            {params: {album: albumId}
            });

            if(!response.data) return null;

        return response.data;
    }
);