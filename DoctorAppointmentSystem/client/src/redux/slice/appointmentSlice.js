import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, CancelAppointment, getAllAppointments, getAppointmentDetails, getUserAppointments, updateAppointmentStatus } from "../actions/appointmentActions";

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        loading: false,
        success: false,
        appointments: null,
        appointment: null,
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
            state.appointments = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(bookAppointment.pending, (state) => {
            state.loading = true
        })
        .addCase(bookAppointment.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.appointment = action.payload.appointment
        })
        .addCase(bookAppointment.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(getUserAppointments.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserAppointments.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.appointments = action.payload.appointments;
            // state.appointments = action.payload.appointments
        })
        .addCase(getUserAppointments.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(CancelAppointment.pending, (state) => {
            state.loading = true
        })
        .addCase(CancelAppointment.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
        })
        .addCase(CancelAppointment.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(getAppointmentDetails.pending, (state) => {
            state.loading = true
        })
        .addCase(getAppointmentDetails.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.appointment = action.payload.appointmentDetails;
        })
        .addCase(getAppointmentDetails.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
    }
})

export const {reset} = appointmentSlice.actions;
export default appointmentSlice.reducer;