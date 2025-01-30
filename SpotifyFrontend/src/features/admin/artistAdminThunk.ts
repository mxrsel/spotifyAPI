import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const getAllArtistsForAdmin = createAsyncThunk<Artist[], void>(
    'admin/artists/getAllArtistsForAdmin',
    async() => {
        const response = await axiosApi<Artist[]>('/admin/artists');
        return response.data || []
    }
);

export const deleteAdminArtist = createAsyncThunk<void, string, { state: RootState }>(
    'admin/artists/deleteAdminArtist',
    async (artistId, { getState }) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/admin/artists/${artistId}`, {
                headers: { Authorization: token },
            });
        } catch (e) {
            console.error(e);
        }
    }
);

