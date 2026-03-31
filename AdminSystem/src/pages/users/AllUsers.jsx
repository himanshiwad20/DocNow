import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userActions.js';
import { NavLink } from 'react-router-dom';

const AllUsers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const {users} = useSelector((state) => state.user)

  return (
    <Layout>
      <h4 className='text-center my-3'>All Users</h4>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, i) => (
            <tr key={i+1}>
              <td>{i+1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.phone || "NA"}</td>
              <td>
                <NavLink to={`/getUserDetails/${user._id}`}>
                  More Details
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default AllUsers
