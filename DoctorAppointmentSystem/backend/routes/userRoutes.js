import express from "express";
import {registerController, loginController, updateUserController, updatePasswordController, getAllUsersController, getUserDetailsController, getLoginUserController} from '../controllers/userController.js'
import upload from "../Middlewares/multer.js";
import { isAdminn, userAuth } from "../Middlewares/authMiddleware.js";

// const {
//   loginController,
//   registerController,
// } = userCtrl;

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

router.patch('/updateUser/:id', userAuth, upload.single('image'), updateUserController)

router.patch('/updatePassword/:id', userAuth,  updatePasswordController)

router.get('/getAllUsers', userAuth, isAdminn, getAllUsersController)

router.get('/getUserDetails/:id', userAuth, isAdminn, getUserDetailsController)

router.get('/getLoginUser/:id', userAuth, getLoginUserController)

// module.exports = router;
export default router;
