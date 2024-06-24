import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse } from "@/core/api";
import {  allUsersState } from "../types";
import { getAllUsers } from "../thunks/auth-thunk";

//* Initial State
const initialState: allUsersState = {
    users: [],
    loading: false,
    error: "",
};

const allUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearError(state) {
            state.error = "";
        },
        setLoading(state, action: { payload: boolean; type: string }) {
            state.loading = action.payload;
        },
    },
    extraReducers(builder) {
        //* get all users
        builder.addCase(getAllUsers.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.users = initialState.users;
        });
      
    },
});

export const { setLoading, clearError } = allUsersSlice.actions;
export default allUsersSlice.reducer;
