import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';

const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('appData')
    toast.success('Logout successful')
    navigate('/')
  }
  return (
    <div className='container d-flex flex-column bg-black'>
        <ul className='nav navBar d-flex flex-column justify-content-center bg-black min-vh-100 px-4'>
          <h2 className='text-center'>Admin Panel</h2>
          <li className='nav-item'>
            <NavLink className='nav-link' to={'/home'}>Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to={'/allUsers'}>Users</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to={'/allDoctors'}>Doctors</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to={'/allAppointments'}>Appointments</NavLink>
          </li>
          <button className='btn btn-danger m-3' onClick={handleLogout}>Logout</button>
        </ul>
    </div>
  )
}

export default Menu
