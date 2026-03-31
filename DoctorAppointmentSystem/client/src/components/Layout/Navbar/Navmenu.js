import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { getUserData } from './../../../redux/actions/authActions';

const Navmenu = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handleBooking = () => {
    if(user) {
      navigate('/doctors')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
       <div className="container-fluid">
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             <li className="nav-item">
               <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
             </li>
             <li className="nav-item">
               <NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink>
             </li>
             <li className="nav-item">
               <NavLink className="nav-link active" aria-current="page" to="/doctors">Doctors</NavLink>
             </li>
             <li className="nav-item">
               <NavLink className="nav-link active" aria-current="page" to="/gallery">Gallery</NavLink>
             </li>
             <li className="nav-item">
               <NavLink className="nav-link active" aria-current="page" to="/contact">Contact</NavLink>
             </li>
           </ul>
           <form className="d-flex" role="search">
             <button className="appointment-btn" type="button" onClick={handleBooking}>Book an Appointment</button>
           </form>
           {/* <form className="d-flex" role="search">
             <button className="appointment-btn" type="button" 
             onClick={() => window.open("http://localhost:5173/", "_blank")}>DocNow Expert</button>
           </form> */}

           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            { user ? 
              <li className="nav-item">
                 <NavLink className="nav-link" aria-current="page" to="/user/profile">My Account</NavLink>
              </li> :
              <li className="nav-item">
                 <NavLink className="nav-link" aria-current="page" to="/login" >LOGIN</NavLink>
              </li>
            }
           </ul>
         </div>
       </div>
     </nav>
    </>
  )
}

export default Navmenu
