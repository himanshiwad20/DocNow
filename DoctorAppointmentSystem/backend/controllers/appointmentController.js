import appointmentModel from "../models/appointmentModel.js"
import userModel from './../models/userModels.js';
import doctorModel from './../models/doctorModel.js';

export const bookAppointmentController = async (req, res) => {
    try {
        const {userId, doctorId, slotDate, slotTime, amount} = req.body
        if(!userId || !doctorId || !amount || !slotDate || !slotTime) {
            return res.status(404).send({
                success: false,
                message: "Enter all details to book the appointment"
            })
        }

        const existingAppointment = await appointmentModel.findOne({
            doctorId,
            slotDate,
            slotTime,
            status: 'pending'
        });

        if (existingAppointment) {
            return res.status(409).send({
                success: false,
                message: "This slot is already booked for this doctor",
                existingAppointment
            });
        }

        //check for any appointment from the same doctor at the same time will be discarded

        const appointment = new appointmentModel({userId, doctorId, slotDate, slotTime, amount})
        await appointment.save()

        res.status(200).send({
            success: true,
            message: "Appointment booked successfully",
            appointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in booking appointment controller",
            error
        })
    }
} 

export const getAllAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})

        res.status(200).send({
            success: true,
            message: "All appointments displayed",
            count: appointments.length,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting all appointment controller",
            error
        })
    }
}

export const getAppointmentController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the appointment"
            })
        }

        const appointment = await appointmentModel.findById(id)
        if(!appointment) {
            return res.status(404).send({
                success: false,
                message: "No such appointment exists"
            })
        }

        const patient = await userModel.findById({_id: appointment?.userId})
        const doctor = await doctorModel.findById({_id: appointment?.doctorId})

        res.status(200).send({
            success: true,
            message: "Got your appointment",
            appointmentDetails: {
                patientName: patient?.name,
                patientPhone: patient?.phone,
                patientEmail: patient?.email,
                doctorName: doctor?.name,
                doctorEmail: doctor?.email,
                doctorPhone: doctor?.phone,
                slotDate: appointment?.slotDate,
                slotTime: appointment?.slotTime,
                amount: appointment?.amount,
                bookingStatus: appointment?.status,
                paymentMode: appointment?.payment,
                createdAt: appointment?.createdAt
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting appointment controller",
            error
        })
    }
}


export const updateStatusController = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the appointment"
            })
        }

        const {status} = req.body

        if(!status) {
            return res.status(404).send({
                success: false,
                message: "Please provide valid status"
            })
        }

        const appointment = await appointmentModel.findByIdAndUpdate(id,
            {$set: {status: status}},
            {returnOriginal: false}
        )

        res.status(200).send({
            success: true,
            message: "Appointment Status updated successfully!",
            appointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating appointment status controller",
            error
        })
    }
}

export const getUserAppointmentsController = async(req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the user"
            })
        }

        const user = await userModel.findById(id)
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Please provide valid user id"
            })
        }

        const appointments = await appointmentModel.find({userId: user?._id})

        res.status(200).send({
            success: true,
            message: "All appointments of user displayed",
            count: appointments.length,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting user appointments controller",
            error
        })
    }
}

export const getUserAppointmentController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the appointment"
            })
        }

        const appointment = await appointmentModel.findById(id)
        if(!appointment) {
            return res.status(404).send({
                success: false,
                message: "No such appointment exists"
            })
        }

        const patient = await userModel.findById({_id: appointment?.userId})
        const doctor = await doctorModel.findById({_id: appointment?.doctorId})

        res.status(200).send({
            success: true,
            message: "Got your appointment",
            appointmentDetails: {
                doctorName: doctor?.name,
                doctorEmail: doctor?.email,
                doctorPhone: doctor?.phone,
                slotDate: appointment?.slotDate,
                slotTime: appointment?.slotTime,
                amount: appointment?.amount,
                bookingStatus: appointment?.status,
                paymentMode: appointment?.payment,
                createdAt: appointment?.createdAt
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting user appointment controller",
            error
        })
    }
}


export const cancelBookingController = async (req, res) => {
    try {
        const {id} =req.params
        if(!id) {
            return res.status(404).send({
                success: false,
                message: "Enter id of the appointment"
            })
        }
        const appointment = await appointmentModel.findById(id)
        if(!appointment) {
            return res.status(404).send({
                success: false,
                message: "No such appointment found"
            })
        }
        await appointment.updateOne({$set:{status: "cancelled"}})
        res.status(200).send({
            success: true,
            message: "Appointment cancelled successfully!",
            appointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in cancelling user appointment controller",
            error
        })
    }
}