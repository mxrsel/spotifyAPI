import {createAsyncThunk} from "@reduxjs/toolkit";
import {Composition} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const getAllCompositionsForAdmin = createAsyncThunk<Composition[], void>(
    'admin/compositions/getAllCompositionsForAdmin',
    async () => {
        const response = await axiosApi<Composition[]>('/admin/compositions');
        return response.data || [];
    }
);

export const deleteAdminComposition = createAsyncThunk<void, string, { state: RootState }>(
    'admin/compositions/deleteAdminComposition',
    async (artistId, { getState }) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/admin/compositions/${artistId}`, {
                headers: { Authorization: token },
            });
        } catch (e) {
            console.error(e);
        }
    }
);

