import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../redux/actions/authActions'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const {user} = useSelector(state => state.auth)

  return (
    <Layout>
      <div className='d-flex flex-column my-3 border bg-light rounded-3 text-center'>
        <h1>DASHBOARD</h1>
        <p>Doctor Appointment</p>
        <p className='text-success'>Welcome {user?.name} || Email: {user?.email}{" "}</p>
      </div>
    </Layout>
  )
}

export default Home
