import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

//register 
export const registerController = async (req, res) => {
  try {

    const {name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "Enter Name, Email and Password"
      })
    }

    const exisitingUser = await userModel.findOne({ email: email });
    if (exisitingUser) {
      return res
        .status(404)
        .send({success: false, message: "User Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const userData = {name, email, password: hashedPassword};
    const newUser = new userModel(userData);
    const user=await newUser.save();

    res.status(201).send({
      success: true,
       message: "Register Sucessfully",
       user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Register Controller: ${error.message}`,
      error
    });
  }
};

// login callback
export const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({success: false,
        message: "user not found"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({ 
        success: false,
        message: "Invalid Email or Password"
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ 
      success: true,
      message: "Login Success",
      token ,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login Controller: ${error.message}` 
    });
  }
};


export const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id) {
      return res.status(404).send({
        success: false,
        message: "Enter id",
        error
      })
    } 

    const {name, phone, image, dob, gender, address} = req.body
    const imageToBase64 = req.file && req.file.buffer.toString('base64')
    const user = await userModel.findByIdAndUpdate(id, {
      $set:{name, phone, dob, gender, address, image: imageToBase64}
    }, {returnOriginal: false})
    res.status(200).send({
      success: true,
      message: "User detatils updated successfully",
      user
    })
  } catch (error) {
    console.log(error)
    res.status(402).send({
      success: false,
      message: "Error in updateUser Controller",
      error
    })
  }
}


export const updatePasswordController = async (req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(404).send({
        success: false,
        message: "Enter valid id"
      })
    }

    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
      return res.status(404).send({
        sucess: false,
        message: "Please enter old and new password"
      })
    }

    const user = await userModel.findById(id)
    if(!user) {
      return res.status(404).send({
        sucess: false,
        message: "Not a valid user"
      })
    }

    const isMatch = await bcrypt.compare(oldPassword, user?.password)
    if(!isMatch) {
      return res.status(401).send({
        sucess: false,
        message: "Enter correct old password"
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashPassword
    await user.save()

    res.status(200).send({
      success: true,
      message: "Password updated successfully"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in updatePasswordController",
      error
    })
  }
}


export const getAllUsersController = async (req, res) => {
  try {
    
    const users = await userModel.find({});

    console.log("In getAllUsers API Controller")

    res.status(200).send({
      success: true,
      message: "got all users successfully",
      count: users.length,
      users
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting all users",
      error
    })
  }
}


export const getUserDetailsController = async(req, res) => {
  try {
    const {id} = req.params
    // console.log("id")
    if(!id) {
      return res.status(404).send({
        success: false,
        message: "Please enter id"
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
      message: "Got all user details successfully",
      user,
      appointmentCount: appointments.length,
      appointments
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting the user details (appointments)",
      error
    })
  }
}



export const getLoginUserController = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid user id"
      })
    }

    const user = await userModel.findById(id);
    if(!user) {
      return res.status(404).send({
        success: false,
        message: "No user found"
      })
    }

    res.status(200).send({
      success: true,
      message: "got current login user successfully",
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting all users",
      error
    })
  }
}