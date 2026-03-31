import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: [true, "Role is require"]
  },
}, {timestamps: true});

const userModel = mongoose.model("users", userSchema);

// module.exports = userModel;
export default userModel;
