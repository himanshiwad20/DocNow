import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addDoctor } from '../../redux/actions/doctorActions'
import InputForm from './../../components/Forms/InputForm';
import InputSelect from './../../components/Forms/InputSelect';

const AddDoctor = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experience, setExperience] = useState("")
  const [degree, setDegree] = useState("")
  const [about, setAbout] = useState("")
  const [fees, setFees] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {success, error} = useSelector(state => state.doctor)

  const handleAddDoctor = async() => {
    if(!name || !email || !image || !specialization || !experience || !degree 
        || !about || !fees || !address || !gender || !phone
    ) {
      return toast.error("Enter all details")
    }

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


    dispatch(addDoctor(formData))

    if(success) {
      toast.success("Doctor added successfully!")
      navigate('/allDoctors')
    }
    if(error) {
      toast.error(error)
    }

  }

  return (
    <Layout>
      <div className='d-flex p-3 justify-content-between bg-light'>
        <h1>
          Add Doctor Details
        </h1>
        <button className='btn btn-primary' onClick={() => navigate('/allDoctors')}>
          Go Back
        </button>
      </div>
        <div className='w-75'>
          <InputForm label={'Name'} value={name} setValue={setName}/>
          <InputForm label={'Email'} value={email} setValue={setEmail}/>
          <InputForm label={'Phone'} value={phone} setValue={setPhone}/>
          <InputForm label={'Degree'} value={degree} setValue={setDegree}/>
          <InputSelect label={'specialization'} value={specialization} setValue={setSpecialization} options={['Select Specializaton', 'General', 'Dental', 'Optical', 'Dermat']}/>
          <InputSelect label={'Gender'} value={gender} setValue={setGender} options={['Select Gender', 'Male', 'Female']}/>
          <InputForm label={'Experience'} value={experience} setValue={setExperience}/>
          <InputForm label={'Fees'} value={fees} setValue={setFees}/>
          <InputForm label={'Address'} value={address} setValue={setAddress}/>
          <InputForm label={'About'} value={about} setValue={setAbout}/>
          <div className='m-3'>
            <label htmlFor='form-label'>Select Image File:</label>
            <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} className='form-control'/>
          </div>
          <button className='btn btn-primary m-3' onClick={handleAddDoctor}>Add New Doctor</button>
        </div>
        
      
    </Layout>
  )
}

export default AddDoctor
