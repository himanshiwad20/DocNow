import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendWebMessage } from "../../../redux/actions/userActions";

const MessageForm = () => {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const handleMessage = () => {
    if(!name || !contact || !message) {
      return toast.error("Please enter name, contact and message")
    }

    const messageData = {
      name: name,
      contact: contact,
      message: message
    }

    dispatch(sendWebMessage(messageData))

    if(success) {
      toast.success('Message sent successfully!!')
      setName("")
      setContact("")
      setMessage("")
    }
    if(error) {
      toast.error(error)
    }
  }

  const {success, error} = useSelector(state => state.auth)

  return (
    <>
      <div className="mform">
        <h1>Send Us Message</h1>
        <input type="text" placeholder="enter your name" required={true} value={name} onChange={e => setName(e.target.value)}/>
        <input type="text" placeholder="enter your contact" required={true} value={contact} onChange={e => setContact(e.target.value)}/>
        <textarea
          placeholder="enter your message"
          name="message"
          rows={5}
          value={message} onChange={e => setMessage(e.target.value)}
        ></textarea>
        <button className="btn" onClick={handleMessage}>Send Message</button>
      </div>
    </>
  );
};

export default MessageForm;