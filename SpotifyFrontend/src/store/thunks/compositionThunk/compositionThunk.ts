import {createAsyncThunk} from "@reduxjs/toolkit";
import {Composition, CompositionMutation} from "../../../types.ts";
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
        await axiosApi.post('/compositions', {...composition});
    }
);

export const getCompositionsByAlbum = createAsyncThunk(
    'compositions/getAlbumId',
    async(albumId: string) => {
        const response = await axiosApi.get<Composition[]>(`/compositions?albumId=${albumId}`,
            {params: {album: albumId}
            });

        return response.data.sort((firstAddedComposition, lastAddedComposition) => lastAddedComposition.composition_number - firstAddedComposition.composition_number);
    }
);