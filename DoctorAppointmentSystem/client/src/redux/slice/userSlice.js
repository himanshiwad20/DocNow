import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserDetails, resetPassword, sendWebMessage } from './../actions/userActions.js';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        success: false,
        users: null,
        user: null,
        appointments: null, 
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.users = action.payload.users;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(getUserDetails.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.user = action.payload.user;
            state.appointments = action.payload.appointments
        })
        .addCase(getUserDetails.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(sendWebMessage.pending, (state) => {
            state.loading = true
        })
        .addCase(sendWebMessage.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.webMessage = action.payload.webMessage
        })
        .addCase(sendWebMessage.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(resetPassword.pending, (state) => {
            state.loading = true
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
    }
})

export const {reset} = userSlice.actions;
export default userSlice.reducer;