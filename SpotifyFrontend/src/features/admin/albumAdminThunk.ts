import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Album} from "../../types.ts";
import {RootState} from "../../app/store.ts";

export const getAllAlbumsForAdmin = createAsyncThunk<Album[], void>(
    'admin/albums/getAllAlbumsForAdmin',
    async() => {
        const response = await axiosApi<Album[]>('/admin/albums');
        return response.data || []
    }
);

export const deleteAdminAlbum = createAsyncThunk<void, string, { state: RootState }>(
    'admin/items/deleteAdminAlbum',
    async (albumId, { getState }) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/admin/albums/${albumId}`, {
                headers: { Authorization: token },
            });
        } catch (e) {
            console.error(e);
        }
    }
);