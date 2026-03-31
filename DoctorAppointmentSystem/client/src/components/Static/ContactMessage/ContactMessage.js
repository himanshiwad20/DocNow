import React from "react";
import "./ContactMessage.css";
import LocationMap from "./LocationMap";
import MessageForm from "./MessageForm";

const ContactMessage = () => {
  return (
    <>
      <div className="row my-5 mx-0 px-0 py-5 message-container">
        <div className="col-md-4">
          <LocationMap />
        </div>
        <div className="col-md-6">
          <MessageForm />
        </div>
      </div>
    </>
  );
};

export default ContactMessage;