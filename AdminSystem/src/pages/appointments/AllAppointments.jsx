import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { getAllAppointments } from '../../redux/actions/appointmentActions';

const AllAppointments = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllAppointments())
  }, [dispatch])

  const {appointments} = useSelector(state => state.appointment)

  return (
    <Layout>
      <h1>All Appointments</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Details/Edit</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((a, i) => (
            <tr key={i+1}>
              <td>{i+1}</td>
              <td>{a._id}</td>
              <td>{a.slotDate}</td>
              <td>₹ {a.amount}</td>
              <td>{a.status}</td>
              <td>{a.payment? "Online" : "Cash"}</td>
              <td>
                <Link to={`/appointmentDetails/${a._id}`}>More Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default AllAppointments
