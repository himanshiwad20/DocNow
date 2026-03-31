import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, CancelAppointment, getAppointmentDetails, getLoginUser, getToken, getUserAppointments, getUserData, login, register, resetPassword, sendWebMessage, updateUser } from "../actions/authActions.js";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        success: false,
        user: null,
        appointments: null,
        appointment: null,
        webMessage: null,
        token: null, 
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
        },
        logout: (state) => {
            state.user = null
            state.token = null 
            state.success = false
        }
    },
    extraReducers: builder => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success; 
            state.user = action.payload.user;
            state.token = action.payload.token;
            // console.log(state.success);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
            // console.log(state.success);
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        // .addCase(getUserData.fulfilled, (state, action) => {
        //     state.user = action.payload
        // })
        // .addCase(getToken.fulfilled, (state, action) => {
        //     state.token = action.payload
        // })
        .addCase(getLoginUser.pending, (state) => {
            state.loading = true
        })
        .addCase(getLoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.user = action.payload.user;
            // state.appointments = action.payload.appointments
        })
        .addCase(getLoginUser.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.user = action.payload.user;
            // state.appointments = action.payload.appointments
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
    }
})

export const {reset, logout} = authSlice.actions;
export default authSlice.reducer;