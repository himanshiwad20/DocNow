import React from 'react'
import Menu from './Menu'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
    <div className='container-fluid ps-0'>
      <div className='row min-vh-100'>
        <div className='col-md-2 p-0'>
            <Menu/>
        </div>
        <div className='col-md-10 p-0'>
            <div style={{minHeight: '75vh'}}>
                {children}
            </div>
            <Footer/>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default Layout
