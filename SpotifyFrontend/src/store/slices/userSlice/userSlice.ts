import {User} from "../../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {register} from "../../thunks/userThunk/userThunk.ts";


interface UserProps {
    user: User | null;
    isLoading: boolean;
    isError: boolean
}

const initialState: UserProps = {
    user: null,
    isLoading: false,
    isError: false
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                register.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                register.fulfilled, (state, {payload: registerResponse}) => {
                    state.isLoading = false;
                    state.user = registerResponse.user;
                }
            )
            .addCase(
                register.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true
                }
            )
    }
});

export const userReducer = userSlice.reducer