import express from 'express'
import {addDoctorController, getAllDoctorsController, getDoctorController, updateDoctorController, deleteDoctorController, 
    updateAvailableDoctorStatusController, getDoctorAppointmentsController} from '../controllers/doctorController.js';
import { isAdminn, userAuth } from '../Middlewares/authMiddleware.js';
import upload from './../Middlewares/multer.js';

const router = express.Router()

router.post('/add', userAuth, isAdminn, upload.single("image"), addDoctorController)
router.get('/allDoctors', getAllDoctorsController)
router.get('/getDoctor/:id', getDoctorController)
router.get('/getDoctorAppointments/:id', userAuth, getDoctorAppointmentsController)
router.patch('/update/:id', userAuth, isAdminn, upload.single("image"), updateDoctorController)
router.delete('/delete/:id', userAuth, isAdminn, deleteDoctorController)
router.patch('/updateAvailableStatus/:id', userAuth, isAdminn, updateAvailableDoctorStatusController)

export default router;