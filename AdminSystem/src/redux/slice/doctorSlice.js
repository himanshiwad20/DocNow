import { createSlice } from "@reduxjs/toolkit";
import { addDoctor, deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor, updateStatusDoctor } from "../actions/doctorActions";

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        loading: false,
        success: false,
        doctors: null,
        doctor: null,
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
        .addCase(getAllDoctors.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllDoctors.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.doctors = action.payload.doctors;
        })
        .addCase(getAllDoctors.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(getDoctorDetails.pending, (state) => {
            state.loading = true
        })
        .addCase(getDoctorDetails.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.doctor = action.payload.doctor;
        })
        .addCase(getDoctorDetails.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(addDoctor.pending, (state) => {
            state.loading = true
        })
        .addCase(addDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.success = true; 
            state.doctor = action.payload.doctor;
        })
        .addCase(addDoctor.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(updateDoctor.pending, (state) => {
            state.loading = true
        })
        .addCase(updateDoctor.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
            // state.doctor = action.payload.doctor;
        })
        .addCase(updateDoctor.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(deleteDoctor.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteDoctor.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
            // state.doctor = action.payload.doctor;
        })
        .addCase(deleteDoctor.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
        .addCase(updateStatusDoctor.pending, (state) => {
            state.loading = true
        })
        .addCase(updateStatusDoctor.fulfilled, (state) => {
            state.loading = false
            state.success = true; 
            // state.doctor = action.payload.doctor;
        })
        .addCase(updateStatusDoctor.rejected, (state, action) => {
            state.loading = false 
            state.error = action.payload
        })
    }
})

export const {reset} = doctorSlice.actions;
export default doctorSlice.reducer;