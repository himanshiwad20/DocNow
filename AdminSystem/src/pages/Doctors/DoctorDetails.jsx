import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoctor, getDoctorDetails, updateDoctor, updateStatusDoctor } from '../../redux/actions/doctorActions'
import { useNavigate, useParams } from 'react-router-dom'
import InputForm from './../../components/Forms/InputForm';
import InputSelect from './../../components/Forms/InputSelect';
import toast from 'react-hot-toast'

const DoctorDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {id} = useParams()
  useEffect(() => {
    dispatch(getDoctorDetails(id))
  }, [dispatch, id])

  const {doctor, success, error} = useSelector(state => state.doctor)
  const [edit, setEdit] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState(null)
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [degree, setDegree] = useState("")
  const [about, setAbout] = useState("")
  const [fees, setFees] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")


  useEffect(() => {
    if (doctor) {
      setName(doctor.name)
      setEmail(doctor.email)
      setPhone(doctor.phone)
      setDegree(doctor.degree)
      setSpecialization(doctor.specialization)
      setGender(doctor.gender)
      setExperience(doctor.experience)
      setFees(doctor.fees)
      setAddress(doctor.address)
      setAbout(doctor.about)
      setImage(doctor.image)
    }
  }, [doctor])

  

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure to delete this doctor?")
    if(!confirmation) {
      return;
    }
    dispatch(deleteDoctor(id))
    if(success) {
      toast.success("Doctor deleted successfully!")
      navigate('/allDoctors')
    }
    if(error) {
      toast.error(error)
    }
  }

  
  const handleUpdate = (id) => {

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('about', about)
    formData.append('specialization', specialization)
    formData.append('fees', fees)
    formData.append('degree', degree)
    formData.append('address', address)
    formData.append('gender', gender)
    formData.append('experience', experience)
    formData.append('image', image)
    formData.append('phone', phone)

    dispatch(updateDoctor({id, formData}))
    if(success) {
      toast.success("Doctor details updated successfully")
      navigate('/allDoctors')
    }
    if(error) {
      toast.error('Error in updating doctor details')
    }
  }

  const handleUpdateStatus = (id, availableStatus) => {
    dispatch(updateStatusDoctor({id, availableStatus}))
    if(success) {
      toast.success("Doctor available status updated successfully")
      navigate('/allDoctors')
    }
    if(error) {
      toast.error('Error in updating doctor status')
    }
  }


  return (
    <Layout>
      <div className='d-flex p-3 justify-content-between bg-light'>
        <h1>
          Add Doctor Details
        </h1>
        <div className='ms-auto'>
          <button className='btn btn-warning ms-3' onClick={() => setEdit(!edit)}>{edit? "Edit" : "Cancel"}</button>
          <button className='btn btn-danger ms-3' onClick={() => handleDelete(doctor._id)}>Delete</button>
        </div>
      </div>
      <div className='w-75'>
        <InputForm label={'Name'} value={name} setValue={setName} disabled={edit}/>
        <InputForm label={'Email'} value={email} setValue={setEmail} disabled={edit}/>
        <InputForm label={'Phone'} value={phone} setValue={setPhone} disabled={edit}/>
        <InputForm label={'Degree'} value={degree} setValue={setDegree} disabled={edit}/>
        <InputSelect label={'specialization'} value={specialization} setValue={setSpecialization} options={['Select Specializaton', 'General', 'Dental', 'Optical', 'Dermat']} disabled={edit}/>
        <InputSelect label={'Gender'} value={gender} setValue={setGender} options={['Select Gender', 'Male', 'Female']} disabled={edit}/>
        <InputForm label={'Experience'} value={experience} setValue={setExperience} disabled={edit}/>
        <InputForm label={'Fees'} value={fees} setValue={setFees} disabled={edit}/>
        <InputForm label={'Address'} value={address} setValue={setAddress} disabled={edit}/>
        <InputForm label={'About'} value={about} setValue={setAbout} disabled={edit}/>
        {doctor?.image &&  <img src={`data: image/jpeg;base64,${doctor.image}`} alt='doctorImage' className='bg-info border rounded-3' height={250} width={250}></img>}
        <div className='m-3'>
          <label htmlFor='form-label'>Select Image File:</label>
          <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} className='form-control' disabled={edit}/>
        </div>
        <div className='flex' style={{marginBottom: '50px'}}>
          <button className='btn btn-primary' onClick={() => handleUpdate(doctor?._id)}>Update Details</button>
          {doctor?.available == 'true' ? (
            <button className='btn btn-danger ms-3' onClick={() => handleUpdateStatus(doctor?._id, {availableStatus: "false"})}>Mark as Unavailable</button>
          ) : (
            <button className='btn btn-success ms-3' onClick={() => handleUpdateStatus(doctor?._id, {availableStatus: "true"})}>Mark as Available</button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default DoctorDetails
