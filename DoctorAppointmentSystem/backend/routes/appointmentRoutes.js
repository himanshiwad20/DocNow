import express from 'express'
import { bookAppointmentController, getAllAppointmentsController, getAppointmentController, updateStatusController,
     getUserAppointmentsController, getUserAppointmentController, cancelBookingController} from '../controllers/appointmentController.js'
import { isAdminn, userAuth } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.post('/book', userAuth, bookAppointmentController)
router.get('/getAll', userAuth, isAdminn, getAllAppointmentsController)
router.get('/get/:id', userAuth, isAdminn, getAppointmentController)
router.patch('/updateStatus/:id', userAuth, isAdminn, updateStatusController)
router.get('/getUserAppointments/:id', userAuth, getUserAppointmentsController)
router.get('/getUserAppointment/:id', userAuth, getUserAppointmentController)
router.patch('/cancelBooking/:id', userAuth, cancelBookingController)

export default router