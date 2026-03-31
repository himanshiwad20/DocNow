import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../redux/actions/userActions';

const userDetails = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=> {
        dispatch(getUserDetails(id))
        console.log(id)
    }, [dispatch, id])

    const {user, appointments} = useSelector(state => state.user)
  return (
    <Layout>
      <div className='row d-flex align-items-center bg-light mt-3 p-3'>
        <h1>User Details</h1>
        <div className='col-md-4'>
          <img src={`data: image/jpeg;base64,${user?.image}`} 
          alt='userImage' height={200} width={200}
          className='rounded-1 bg-info'></img>
        </div>
        <div className='col-md-8'>
          <h4>Name: {user?.name}</h4>
          <h4>Email: {user?.email}</h4>
          <h4>Phone: {user?.phone || "NA"}</h4>
          <h4>Address: {user?.address || "NA"}</h4>
        </div>
        <div className='mt-4'>
          <h2>All Appointments</h2>
          <table className='table mt-2'>
            <thead>
              <th>SNo.</th>
              <th>Date</th>
              <th>Doctor Id</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Payment</th>
            </thead>
            <tbody>
              {appointments && appointments.map((a, i) => (
                <tr key={i+1}>
                  <td>{i+1}</td>
                  <td>{a?.slotDate}</td>
                  <td>{a?.doctorId}</td>
                  <td>₹ {a?.amount}</td>
                  <td>{a?.status}</td>
                  <td>{a?.payment === true? "Online" : "Cash"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default userDetails
