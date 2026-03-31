import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDoctors } from '../../redux/actions/doctorActions'
import { reset } from '../../redux/slice/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const AllDoctor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllDoctors())
    dispatch(reset())
  }, [dispatch])

  const {doctors} = useSelector(state => state.doctor)

  return (
    <Layout>
      <div className='d-flex p-3 justify-content-between bg-light'>
        <h1>All Doctors List</h1>
        <button className='btn btn-primary' onClick={() => navigate('/addDoctor')}>
          + ADD DOCTOR
        </button>
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Fees</th>
              <th>Available</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.map((doctor, i) => (
              <tr key={i+1}>
                <td>{i+1}</td>
                <td>
                  <img src={`data: image/jpeg;base64,${doctor?.image}`} alt='doctorImage' className='bg-info' height={50} width={50}></img>
                </td>
                <td>{doctor?.name}</td>
                <td>{doctor?.specialization}</td>
                <td>₹ {doctor?.fees}</td>
                <td>{doctor.available == "true" ? "Available" : "Not Available"}</td>
                <td>
                  <Link to={`/doctorDetails/${doctor?._id}`}>More Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default AllDoctor
