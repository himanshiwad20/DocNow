import mongoose from 'mongoose'

const webMessageSchema = new mongoose.Schema( {
    name: {
    type: String,
    required: [true, "name is require"],
  },
  contact: {
    type: String,
    required: [true, 'Contact number or email is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  }
}, {timestamps: true})

const webmessageModel = mongoose.model('webmessage', webMessageSchema);

export default webmessageModel;