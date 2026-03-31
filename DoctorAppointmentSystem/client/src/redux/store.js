import {configureStore, combineReducers} from '@reduxjs/toolkit'
import AuthReducer from './slice/authSlice.js'
import UserReducer from './slice/userSlice.js'
import doctorReducer from './slice/doctorSlice.js'
import appointmentReducer from './slice/appointmentSlice.js'

import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'

// const store = configureStore({
//     reducer: {
//         auth: AuthReducer,
//         user: UserReducer,
//         doctor: doctorReducer,
//         appointment: appointmentReducer
//     }
// })

// export default store;

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer
})

// persist configuration
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth']   // persist only auth state
}

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

// persistor
export const persistor = persistStore(store)