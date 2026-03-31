import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is Required"]
    },
    about: {
        type: String, 
        required: [true, "Description is Required"]
    },
    email: {
        type: String, 
        required: [true, "Email is Required"],
        unique: true
    },
    degree: {
        type: String, 
        required: [true, "Degree is Required"]
    },
    specialization: {
        type: String, 
        required: [true, "Speciality is Required"]
    },
    experience: {
        type: Number, 
        required: [true, "Experience is Required"]
    },
    fees: {
        type: Number, 
        required: [true, "Fees is Required"]
    },
    image: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    available: {
        type: String,
        default: true
    }
})

const doctorModel = mongoose.model('doctors', doctorSchema)

export default doctorModel;