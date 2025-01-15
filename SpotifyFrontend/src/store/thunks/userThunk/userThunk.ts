import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterResponse, RegisterUser, ValidationErr} from "../../../types.ts";
import axiosApi from "../../../axiosApi.ts";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<RegisterResponse,
    RegisterUser,
    {rejectValue: ValidationErr}
>(
    'users/register',
    async(register: RegisterUser, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/register', register);
            return response.data
        } catch(e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e
        }
    }
)