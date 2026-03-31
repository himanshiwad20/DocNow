import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import EditUserProfile from "./EditUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { getLoginUser } from "../../redux/actions/authActions";
const UserProfile = () => {
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    // dispatch(reset())
    // const localData = localStorage.getItem("appData")
    // const appData = JSON.parse(localData)
    // if(appData) {
    if(user) {
      const id = user?._id
      dispatch(getLoginUser(id))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('appData')
    sessionStorage.clear();
    naviagte("/login");
    toast.success("logout successfully");
  };

  return (
    <>
      <div className="container mt-5" style={{ minHeight: '60vh'}}>
        <div className="row">
          <h4 className="text-center">Manage Your Account & Appointments</h4>
          <div className="col-md-3 justify-content-center text-center flex">
            {user?.image? 
            <img src={`data: image/jpeg;base64,${user?.image}`}
             alt="userPic" className="card p-2" width={200} />
            :
            <h5 className="d-flex">Please upload profile picture</h5>}
            
          </div>
          <div className="col-md-8 mt-3">
            <div className="user-container mb-3">
              <h6>Name : {user?.name}</h6>
              <h6>Gender : {user?.gender || 'NA'}</h6>
              <h6>DOB : {user?.dob || "NA"}</h6>
              <h6>Email : {user?.email}</h6>
              <h6>Phone : {user?.phone}</h6>
              <h6>Address : {user?.address || "NA"}</h6>
              <h4 className="mt-4">
                <Link to={`/user/resetPassword/${user?._id}`}>Reset Password</Link>
              </h4>
            </div>
            {/* buttons */}
            <div className="button-container mt-5">
              <button
                className="btn btn-warning"
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit Profile
              </button>
              <button
                className="btn btn-primary ms-3"
                onClick={() => naviagte("/user/appointments")}
              >
                <i className="fa-solid fa-list"></i> Appointments
              </button>
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                <i className="fa-solid fa-power-off"></i> LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
      {isOpen && (
        <EditUserProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;