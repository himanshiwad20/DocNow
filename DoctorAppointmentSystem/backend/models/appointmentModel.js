import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'doctors'
  },
  slotDate: {
    type: String,
    require: true
  },
  slotTime: {
    type: String,
    require: true
  },
  amount: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: "pending",
    enum: ['pending', 'confirmed', 'completed', 'cancelled']
  },
  payment: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const appointmentModel = mongoose.model("appointments", appointmentSchema);

// module.exports = userModel;
export default appointmentModel;
