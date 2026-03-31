import React from 'react'
import Topbar from './Topbar'
import Navmenu from './Navmenu'
import { NavLink } from 'react-router-dom'
import logo from './../../../assets/docnowlogo(1).png'

const Navbar = () => {
  return (
    <>
      <div className='navbar-container'>
        <div className='row'>
            <div className='col-md-2'>
              <NavLink to="/">
                <img src={logo} alt='DocNow' className='brand-logo'/>
              </NavLink>
            </div>
            <div className='col-md-10'>
                <div>
                    <Topbar/>
                </div>
                <div>
                    <Navmenu/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
