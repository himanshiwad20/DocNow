import React from "react";

const LocationMap = () => {
  return (
    <>
      <div className="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.1244531230358!2d77.30754660317234!3d23.269185566202662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c676cfee9f67d%3A0x6b7522bbea93dd93!2sChirayu%20Medical%20College%20%26%20Hospital!5e0!3m2!1sen!2sin!4v1768459070095!5m2!1sen!2sin"
          width={"100%"}
          height={400}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default LocationMap;