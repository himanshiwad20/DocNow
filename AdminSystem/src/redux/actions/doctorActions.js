import {createAsyncThunk} from '@reduxjs/toolkit'
import API from "../../../API/API.jsx";

export const getAllDoctors = createAsyncThunk(
    'doctor/getAllDoctors',
    async (_, thunkApi) => {
        try {
            const res = await API.get('/doctor/allDoctors')
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting all doctor details'
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getDoctorDetails = createAsyncThunk(
    'doctor/getDoctorDetails',
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/doctor/getDoctor/${id}`)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting doctor details'
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const addDoctor = createAsyncThunk(
    'user/addDoctor',
    async (formData, thunkApi) => {
        try {
            // console.log(formData)
            const res = await API.post('/doctor/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in adding new doctor'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const updateDoctor = createAsyncThunk(
    'user/updateDoctor',
    async ({id, formData}, thunkApi) => {
        try {
            // console.log(formData)
            const res = await API.patch(`/doctor/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in updating doctor details'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const deleteDoctor = createAsyncThunk(
    'user/deleteDoctor',
    async (id, thunkApi) => {
        try {
            // console.log(formData)
            const res = await API.delete(`/doctor/delete/${id}`)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in deleting doctor'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const updateStatusDoctor = createAsyncThunk(
    'user/updateStatus',
    async ({id, availableStatus}, thunkApi) => {
        try {
            // console.log(formData)
            // console.log(availableStatus)
            const res = await API.patch(`/doctor/updateAvailableStatus/${id}`, availableStatus)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in updating doctor available status'
            return thunkApi.rejectWithValue(message)
        }
    }
)

