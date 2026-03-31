import express from 'express';
import { createWebMessage, deleteWebMessage, getAllWebMessage } from '../controllers/webMessageController.js';
import { userAuth, isAdminn } from '../Middlewares/authMiddleware.js';


const router = express.Router()

router.post("/create", createWebMessage)

router.get('/getAll', getAllWebMessage)

router.delete('/delete/:id', userAuth, isAdminn, deleteWebMessage)

export default router;