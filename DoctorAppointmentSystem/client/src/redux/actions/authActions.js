import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API/API.jsx";

export const login = createAsyncThunk(
    'auth/login',
    async({email, password}, thunkApi) => {
        try {
            const res = await API.post('/user/login', {email, password})
            localStorage.setItem('appData', JSON.stringify(res.data))
            // console.log(res)
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'login error'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const register = createAsyncThunk(
    'auth/register',
    async({name, email, password}, thunkApi) => {
        try {
            const res = await API.post('/user/register', {name, email, password})
            localStorage.setItem('appData', JSON.stringify(res.data))
            // console.log(res)
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'register error'
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getUserData = createAsyncThunk(
    'auth/getUserData',
    () => {
        const localData = localStorage.getItem("appData")
        const appData = JSON.parse(localData)
        return appData?.user;
    }
)

export const getToken = createAsyncThunk(
    'auth/getToken',
    () => {
        const localData = localStorage.getItem("appData")
        const appData = JSON.parse(localData)
        return appData?.token;
    }
)


export const getLoginUser = createAsyncThunk(
    'user/getLoginUser',
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/user/getLoginUser/${id}`)
            // console.log(res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in getting login user details'
            return thunkApi.rejectWithValue(message)
        }
    }
)


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({id, formData}, thunkApi) => {
        try {
            const res = await API.patch(`/user/updateUser/${id}`, formData, {
                headers: {
                    "Content-Type":'multipart/form-data'
                }
            })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'error in updating user details'
            return thunkApi.rejectWithValue(message)
        }
    }
)

// export const getUserAppointments = createAsyncThunk(
//     'user/getUserAppointments',
//     async (id, thunkApi) => {
//         try {
//             const res = await API.get(`/appointment/getUserAppointments/${id}`)
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in getting user appointments'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )

// export const CancelAppointment = createAsyncThunk(
//     'user/CancelAppointment',
//     async (id, thunkApi) => {
//         try {
//             const res = await API.patch(`/appointment/cancelBooking/${id}`)
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in cancelling user appointment'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )


// export const getAppointmentDetails = createAsyncThunk(
//     'user/getAppointmentDetails',
//     async (id, thunkApi) => {
//         try {
//             const res = await API.get(`/appointment/getUserAppointment/${id}`)
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in getting appointment details'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )


// export const resetPassword = createAsyncThunk(
//     'user/resetPassword',
//     async ({id, oldPassword, newPassword}, thunkApi) => {
//         try {
//             const res = await API.patch(`/user/updatePassword/${id}`, {oldPassword, newPassword})
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in resetting the password'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )


// export const bookAppointment = createAsyncThunk(
//     'user/bookAppointment',
//     async (bookingData, thunkApi) => {
//         try {
//             const res = await API.post(`/appointment/book`, bookingData)
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in booking an appointment'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )


// export const sendWebMessage = createAsyncThunk(
//     'user/sendWebMessage',
//     async (messageData, thunkApi) => {
//         try {
//             const res = await API.post(`/webmessage/create`, messageData)
//             // console.log(res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error?.message || 'error in sending web message'
//             return thunkApi.rejectWithValue(message)
//         }
//     }
// )