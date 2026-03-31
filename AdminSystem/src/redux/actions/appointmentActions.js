import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../API/API";

export const getAllAppointments = createAsyncThunk(
    'appointment/getAllAppointments',
    async (_, thunkApi) => {
        try {
            const res = await API.get('/appointment/getAll')
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting all appointment details'
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getAppointmentDetails = createAsyncThunk(
    'appointment/getAppointmentDetails',
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/appointment/get/${id}`)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting appointment details'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const updateAppointmentStatus = createAsyncThunk(
    'appointment/updateAppointmentStatus',
    async ({id, status}, thunkApi) => {
        try {
            // console.log(appointmentStatus)
            const res = await API.patch(`/appointment/updateStatus/${id}`, {status})
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in updating appointment status'
            return thunkApi.rejectWithValue(message)
        }
    }
)
