import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelAppointment, getUserAppointments } from "../../redux/actions/appointmentActions";
import { reset } from "../../redux/slice/appointmentSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const localData = localStorage.getItem("appData")
    const appData = JSON.parse(localData)
    if(appData) {
      const id = appData?.user?._id
      dispatch(getUserAppointments(id))
      // dispatch(reset())
    }
  }, [dispatch])

  const {appointments, success, error} = useSelector(state => state.appointment)

  const handleCancel = (id) => {
    try {
      dispatch(CancelAppointment(id)).unwrap()
      toast.success("Appointment cancelled successfully!")

      const localData = localStorage.getItem("appData")
      const appData = JSON.parse(localData)
      const userId = appData?.user?._id

      dispatch(getUserAppointments(userId))
    } catch (error) {
      toast.error(error)
    }
    
    // dispatch(reset())
  }

  // useEffect(() => {
  //   if(success) {
  //     toast.success("Appointment cancelled successfully!")
  //     // window.location.reload()
  //     // dispatch(getUserAppointments(id))
      
  //     dispatch(reset())
  //   } 
  //   if(error) {
  //     toast.error(error)
  //   }
  // }, [dispatch, success, error])

  return (
  <div className="m-3" style={{ minHeight: '60vh' }}> 
    <h1>My All Appointments</h1>
    {appointments?.length>0 ?
    <table className="table">
      <thead>
        <tr>
          <th>SNo.</th>
          <th>Date</th>
          <th>Time</th>
          <th>Fees</th>
          <th>Status</th>
          <th>Details</th>
          <th>Update Booking</th>
        </tr>
      </thead>
      <tbody>
        {appointments?.length > 0 && appointments?.map((a, i) => (
          <tr key={i+1}>
            <td>{i+1}</td>
            <td>{a?.slotDate}</td>
            <td>{a?.slotTime}</td>
            <td>{a?.amount}</td>
            <td>{a?.status}</td>
            <td>
              <Link to={`/user/appointmentDetails/${a?._id}`}>More Details</Link>
            </td>
            <td>
              {a?.status == 'pending' ? <button className="btn btn-danger" onClick={e => handleCancel(a?._id)}>Cancel</button> : "NA"}
            </td>
          </tr>
        ))}
      </tbody>
    </table> 
    : 
    <h4 className="text-center justtify-content center">No Appointments to display</h4>}
  </div>
  )
};

export default MyAppointments;