import {User, ValidationErr} from "../../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {register} from "../../thunks/userThunk/userThunk.ts";


interface UserProps {
    user: User | null;
    isLoading: boolean;
    isError: ValidationErr | null
}

const initialState: UserProps = {
    user: null,
    isLoading: false,
    isError: null
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
                    state.isError = null
                }
            )
            .addCase(
                register.fulfilled, (state, {payload: registerResponse}) => {
                    state.isLoading = false;
                    state.user = registerResponse.user;
                }
            )
            .addCase(
                register.rejected, (state, {payload: err}) => {
                    state.isLoading = false;
                    state.isError = err || null;
                }
            )
    }
});

export const userReducer = userSlice.reducer