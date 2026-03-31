import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js' 

export const addDoctorController = async(req, res) => {
    try {
        const {name, about, email, degree, specialization, fees, image, phone, address, dob, gender, available, experience} = req.body;

        console.log(`${name} ${email} ${about} ${specialization} ${fees} ${degree} ${address} ${gender} ${experience} ${image} ${phone}`)
        
        if(!name || !about || !email || !degree || !specialization || !fees || !phone || !address || !gender|| !experience) {
            return res.status(404).send({
                success: false,
                message: "Enter all the details of Doctor"
            })
        }

        const photoBase64 = req.file && req.file.buffer.toString('base64')
        const doctorDetails = {name, about, email, degree, specialization, fees, image: photoBase64, phone, 
            address, dob, gender, available, experience};
        const doctor = new doctorModel(doctorDetails)
        await doctor.save() 

        res.status(201).send({
            success: true,
            message: "Doctor added successfully!",
            doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in addDoctorController"
        })
    }
} 

export const getAllDoctorsController = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({})
        
        res.status(200).send({
            success: true,
            message: "All Doctors provided",
            count: doctors.length,
            doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting all Doctors Controller",
            error
        })
    }
}

export const getDoctorController = async(req, res) => {
    try {
        const {id} = req.params 
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide the id"
            })
        }

        const doctor = await doctorModel.findById(id)
        if(!doctor) {
            return res.status(404).send({
                success: false,
                message: "Please provide a valid doctor id"
            })
        }

        res.status(200).send({
            success: true,
            message: "Doctor provided",
            doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting single Doctor Controller",
            error
        })
    }
}

export const getDoctorAppointmentsController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the doctor"
            })
        }

        const doctor = await doctorModel.findById(id)
        if(!doctor) {
            return res.status(404).send({
                success: false,
                message: "Please provide valid doctor id"
            })
        }

        const appointments = await appointmentModel.find({doctorId: doctor?._id})

        res.status(200).send({
            success: true,
            message: "All appointments of doctor displayed",
            count: appointments.length,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Doctor appointments Controller",
            error
        })
    }
}

export const updateDoctorController = async(req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide the id"
            })
        }

        // const photoBase64 = req.file && req.file.buffer.toString('base64')
        const data = {...req.body}

        if(req.file) {
            data.image = req.file.buffer.toString('base64')
        }

        const doctorDetails = await doctorModel.findByIdAndUpdate(id,
             {$set: data},
            {returnOriginal: false}
        )
        
        res.status(201).send({
            success: true,
            message: "Doctor Details Updated!!",
            doctorDetails
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success: false,
            message: "Error in updating doctor details controller",
            error
        })
    }
}

export const deleteDoctorController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide the id"
            })
        }

        const doctor = await doctorModel.findById(id)
        if(!doctor) {
            return res.status(402).send({
                success: false,
                message: "No such doctor id exists"
            })
        }
        await doctor.delete()

        res.status(200).send({
            success: true,
            message: "Doctor deleted successfully",
            doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in doctor delete controller",
            error
        })
    }
}

export const updateAvailableDoctorStatusController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide the id"
            })
        }

        // console.log("Inside updateAvailableStatusController")
        const {availableStatus} = req.body
        if(!availableStatus) {
            return res.status(404).send({
                success: false,
                message: "Please provide vaild available status"
            })
        }

        await doctorModel.findByIdAndUpdate(
            id, {$set: {available: availableStatus}},
            {returnOriginal: false}
        )

        res.status(200).send({
            success: true,
            message: "Available status of doctor updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in doctor delete controller",
            error
        })
    }
}