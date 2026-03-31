import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { resetPassword } from '../../redux/actions/userActions'
import { reset } from '../../redux/slice/userSlice'
import { logout } from '../../redux/slice/authSlice'

const ResetPassword = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const {success, error} = useSelector(state => state.user)

    const handleReset = () => {
        if(!oldPassword || !newPassword) {
            toast.error("Please enter old and new password")
        }

        dispatch(resetPassword({id, oldPassword, newPassword}))

        // if(success) {
        //     toast.success("Password reset successful, Please login again")
        //     dispatch(logout())
        //     dispatch(reset())
        //     navigate('/login')
        // }
        // if(error) {
        //     toast.error(error)
        //     dispatch(reset())
        // }
    }

   

    useEffect(() => {
        if(success) {
            toast.success("Password reset successful, Please login again")
            dispatch(logout())
            dispatch(reset())
            navigate('/login')
        }
        if(error) {
            toast.error(error)
            dispatch(reset())
        }
    }, [success, error, dispatch, navigate])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' style={{minHeight: '80vh'} }>
      <h1>Reset Password</h1>
      <div className='mb-3'> 
        <label>Enter Old Password</label>
        <input 
        type='password'
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className='form-control'
        />
      </div>
      <div className='mb-3'> 
        <label>Enter New Password</label>
        <input 
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className='form-control'
        />
      </div>
      <button className='btn btn-primary' onClick={handleReset}>Reset Password</button>
    </div>
  )
}

export default ResetPassword
