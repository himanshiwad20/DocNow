import React from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { getAppointmentDetails } from '../../redux/actions/appointmentActions'
import { reset } from '../../redux/slice/appointmentSlice'

const AppointmentDetails = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAppointmentDetails(id))
        // dispatch(reset())
      }, [dispatch, id])

  const {appointment} = useSelector(state => state.appointment)

  return (
    <> 
    <div className='m-4'>
      <h1>Appointment Details</h1>
      <table className='table my-4'>
        <tbody>
        <tr>
          <th>Doctor Name</th>
          <td>{appointment?.doctorName}</td>
        </tr>
        <tr>
          <th>Doctor Email</th>
          <td>{appointment?.doctorEmail}</td>
        </tr>
        <tr>
          <th>Doctor Phone</th>
          <td>{appointment?.doctorPhone}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{appointment?.slotDate}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{appointment?.slotTime}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{appointment?.amount}</td>
        </tr>
        <tr>
          <th>Booking Status</th>
          <td>{appointment?.bookingStatus}</td>
        </tr>
        </tbody>
      </table>
      </div>
    </>
  )
}

export default AppointmentDetails
