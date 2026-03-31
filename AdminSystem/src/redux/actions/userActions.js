import {createAsyncThunk} from '@reduxjs/toolkit'
import API from "../../../API/API.jsx";

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (_, thunkApi) => {
        try {
            const res = await API.get('/user/getAllUsers')
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting all user details'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/user/getUserDetails/${id}`)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting user details'
            return thunkApi.rejectWithValue(message)
        }
    }
)