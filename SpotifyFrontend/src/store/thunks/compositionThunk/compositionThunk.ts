import {createAsyncThunk} from "@reduxjs/toolkit";
import {Composition, CompositionMutation} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const getAllCompositions = createAsyncThunk<Composition[], void>(
    'compositions/getAllCompositions',
    async () => {
        const response = await axiosApi<Composition[]>('/compositions');
        return response.data || [];
    }
);

export const addComposition = createAsyncThunk<void, CompositionMutation, {state: RootState}>(
    'compositions/addComposition',
    async(composition, {getState}) => {
        const token = getState().users.user?.token
        await axiosApi.post('/compositions', {...composition}, {
            headers: {Authorization: token}
        });
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