import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './slice/authSlice.js'
import UserReducer from './slice/userSlice.js'
import doctorReducer from './slice/doctorSlice.js'
import appointmentReducer from './slice/appointmentSlice.js'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        user: UserReducer,
        doctor: doctorReducer,
        appointment: appointmentReducer
    }
})

export default store;