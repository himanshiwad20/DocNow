import './App.css'
import Login from './pages/users/Login'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import AllDoctor from './pages/Doctors/AllDoctor';
import AllUsers from './pages/users/AllUsers'
import DoctorDetails from './pages/Doctors/DoctorDetails';
import AllAppointments from './pages/appointments/AllAppointments';
import AppointmentDetails from './pages/appointments/AppointmentDetails';
import Home from './pages/Home';
import UserDetails from './pages/users/userDetails';
import AddDoctor from './pages/Doctors/AddDoctor';

function App() {

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/allUsers' element={<AllUsers/>}/>
        <Route path='/allDoctors' element={<AllDoctor/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}/>
        <Route path='/getUserDetails/:id' element={<UserDetails/>}/>
        <Route path='/doctorDetails/:id' element={<DoctorDetails/>}/>
        <Route path='/allAppointments' element={<AllAppointments/>}/>
        <Route path='/appointmentDetails/:id' element={<AppointmentDetails/>}/>
      </Routes>
    </>
  )
}

export default App