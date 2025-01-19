import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import axiosApi from "../../../axiosApi.ts";
import {CompositionHistoryTypes} from "../../../types.ts";

export const getUserHistory = createAsyncThunk<CompositionHistoryTypes[], void, {state: RootState}>(
    'histories/getUserHistory',
    async(_, {getState}) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.get<CompositionHistoryTypes[]>(`/histories`, {headers: {'Authorization': token}});
        return response.data.sort((firstListened, lastListened) => Number(lastListened.datetime) - Number(firstListened.datetime));
    }
);

export const addCompositionToHistory = createAsyncThunk<void, string, {state: RootState}>(
    'histories/addCompositionToHistory',
    async(compositionId, {getState}) => {
        try {
            const token = getState().users.user?.token;
            const response = await axiosApi.post(`/histories`,
                {composition: compositionId},
                {headers: {'Authorization': token}}
            );
            return response.data
        } catch(e) {
            console.log(e)
        }
    }
)