import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentDetails, updateAppointmentStatus } from '../../redux/actions/appointmentActions';
import InputSelect from '../../components/Forms/InputSelect';
import toast from 'react-hot-toast';

const AppointmentDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useParams()

  const [appointmentStatus, setAppointmentStatus] = useState('pending')

  useEffect(() => {
    dispatch(getAppointmentDetails(id))
  }, [dispatch, id])

  const {appointment, success, error} = useSelector(state => state.appointment)

  useEffect(() => {
    if(appointment) {
      setAppointmentStatus(appointment.bookingStatus)
    }
  }, [appointment])

  const handleUpdateStatus = () => {
    // console.log(appointmentStatus)
    dispatch(updateAppointmentStatus({id, status:appointmentStatus}))

    if(success) {
      toast.success("Updated appointment status")
      navigate('/allAppointments')
    }
    if(error) {
      toast.error(error)
    }
  }

  return (
    <Layout>
      <h1>Appointment Details</h1>
      <table className='table my-4'>
        <tbody>
        <tr>
          <th>Client Name</th>
          <td>{appointment?.patientName}</td>
        </tr>
        <tr>
          <th>Client Email</th>
          <td>{appointment?.patientEmail}</td>
        </tr>
        <tr>
          <th>Client Phone</th>
          <td>{appointment?.patientPhone}</td>
        </tr>
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
      <div className='mt-4 w-50'>
        <h5>Update Booking Status</h5>
        <InputSelect value={appointmentStatus} setValue={setAppointmentStatus} 
        options={['pending', 'confirmed', 'completed', 'cancelled']} />
        <button className='btn btn-primary' onClick={handleUpdateStatus}>Update Status</button>
      </div>
    </Layout>
  )
}

export default AppointmentDetails
