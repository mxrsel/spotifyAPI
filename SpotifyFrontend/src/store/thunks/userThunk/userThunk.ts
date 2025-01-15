import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterResponse, RegisterUser} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";

export const register = createAsyncThunk(
    'users/register',
    async(register: RegisterUser) => {
        const response = await axiosApi.post<RegisterResponse>('/users/register', register);
        return response.data
    }
)