import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Appointment.css'
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails, getDoctorAppointments } from "../../redux/actions/doctorActions";
import { bookAppointment } from "../../redux/actions/appointmentActions";
import { toast } from 'react-hot-toast';
import { reset } from "../../redux/slice/appointmentSlice";


const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDoctorDetails(id))
    // dispatch(docReset())
  }, [dispatch, id])

  const {doctor} = useSelector(state => state.doctor)
  const { doctorAppointments } = useSelector((state) => state.doctor);

  useEffect(() => {
    if(doctor) {
      setDocInfo(doctor)
    }
  }, [doctor]);

  useEffect(() => {
    // const formattedDate = extractDate(selectedDate);
    // isSlotBooked()
    dispatch(getDoctorAppointments(id));
  }, [dispatch, id, selectedDate]);

  // 🔹 Generate all slots (9AM - 10PM)
  const generateSlots = () => {
    const slots = [];
    let start = setHours(setMinutes(new Date(), 0), 9);
    const end = setHours(setMinutes(new Date(), 0), 22);

    while (start <= end) {
      slots.push(new Date(start));
      start = new Date(start.getTime() + 30 * 60000);
    }

    return slots;
  };

  // const calculateMinTime = () => {
  //   const now = new Date();
  //   const isToday =
  //   selectedDate &&
  //   selectedDate.toDateString() === now.toDateString();

  //   return isToday
  //     ? now
  //     : setHours(setMinutes(new Date(), 0), 9)
  // }

  const extractDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}-${month}-${year}`
  }

  // 🔹 Check if slot is booked
  const isSlotBooked = (slot) => {
    const slotDate = extractDate(selectedDate);
    const slotTime = extractTime(slot);

    return doctorAppointments?.some(
      (item) => item.slotDate === slotDate && item.slotTime === slotTime
    );
  };

  // 🔹 Check if past time (only for today)
  const isPastTime = (slot) => {
    const now = new Date();
    return (
      selectedDate.toDateString() === now.toDateString() && slot < now
    );
  };

  const handleSlotClick = (slot) => {
    if (isSlotBooked(slot)) {
      return toast.error("This slot is already booked");
    }

    if (isPastTime(slot)) {
      return toast.error("Cannot select past time");
    }

    setSelectedSlot(slot);
  };

  const extractTime = (dateTimeObj) => {
    let hours = dateTimeObj.getHours()
    const minutes = dateTimeObj.getMinutes()
    const seconds = "00" //dateTimeObj.getSeconds()
    const AmPm = hours>=12? "PM" : "AM"

    hours = hours%12
    hours = hours? hours : 12

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${seconds} ${AmPm}`
  }


  const {user} = useSelector(state => state.auth)
  const {success, error} = useSelector(state => state.appointment)

  const handelBooking = async () => {
    try {
      if(!user) {
        return navigate('/login')
      }
      // navigate('/login')

      console.log(selectedDate)
      console.log(selectedSlot)

      const bookingData = {
        userId: user?._id, 
        doctorId: id, 
        slotDate: extractDate(selectedDate), 
        slotTime: extractTime(selectedSlot), 
        amount: docInfo?.fees
      }
      // console.log(bookingData)
      // dispatch(bookAppointment(bookingData))
      // dispatch(reset())

      
      await dispatch(bookAppointment(bookingData)).unwrap()
      toast.success("Appointment booked successfully!")
      navigate("/user/appointments")
    } catch (err) {
      toast.error(err)
    }
  } 

  // useEffect(() => {
  //   if(success) {
  //     toast.success("Appointment booked sucessfully!")
  //     dispatch(reset())
  //     navigate('/user/appointments')
  //   }
  //   if(error) {
  //     toast.error(error)
  //     dispatch(reset())
  //   }
  // }, [success, error, dispatch, navigate])


  return (
  <section className="appointment-section">
    <div className="appointment-wrapper">

      {/* LEFT: Doctor Profile */}
      <div className="doctor-profile-card">
        <div className="doctor-image-wrapper">
          <img
            src={`data:image/jpeg;base64,${docInfo?.image}`}
            alt="Doctor"
          />
        </div>

        <h4>{docInfo?.name}</h4>

        <span
          className={`status-badge ${
            docInfo?.available === "true" ? "available" : "not-available"
          }`}
        >
          {docInfo?.available === "true"
            ? "Available Today"
            : "Not Available"}
        </span>

        <div className="doctor-meta">
          <p><strong>Experience:</strong> {docInfo?.experience} Years</p>
          <p><strong>Consultation Fee:</strong> ₹ {docInfo?.fees}</p>
          <p><strong>Duration:</strong> 30 Minutes</p>
        </div>

        <p className="doctor-about">{docInfo?.about}</p>
      </div>

      {/* RIGHT: Booking Panel */}
      <div className="booking-card">
        <h5>Book Appointment</h5>

        <label>Select Date</label>

        {/* <DatePicker
          className="modern-datepicker ms-4"
          minDate={new Date()}
          selected={selectedDateTime}
          onChange={(date) => setSelectedDateTime(date)}
          showTimeSelect
          timeFormat="h:mm aa"
          timeIntervals={30}
          dateFormat={"d MMMM yyyy h:mm aa"}
          timeCaption="Time"
          minTime={calculateMinTime()}
          maxTime={setHours(setMinutes(new Date(), 2), 22)}
        /> */}
        <DatePicker
          className="modern-datepicker ms-4"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }}
          minDate={new Date()}
          dateFormat="d MMMM yyyy"
        />

        <h5 className="mt-3">Select Time Slot</h5>

        <div className="slots-container">
          {generateSlots().map((slot, index) => {
            const booked = isSlotBooked(slot);           
            const past = isPastTime(slot);
            return (
              <button
                key={index}
                className={`slot-btn 
                  ${booked || past ? "booked" : ""}
                  ${
                    selectedSlot?.getTime() === slot.getTime()
                      ? "selected"
                      : ""
                  }`}
                disabled={booked || past}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
        </div>

        {/* <div className="selected-slot mt-4">
          <strong>Selected Slot:</strong>
          <p>
            {selectedDate
              ? selectedDate.toLocaleString()
              : "Please select date & time"}
          </p>
        </div> */}

        <div className="selected-slot mt-4">
          <strong>Selected Slot:</strong>
          <p>
            {selectedDate && selectedSlot
              ? `${selectedDate.toDateString()} at ${selectedSlot.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Please select date & time"}
          </p>
        </div>

        <button
          className="book-btn"
          disabled={
            docInfo?.available === "true"
              ? user
                ? false
                : true
              : true
          }
          onClick={handelBooking}
        >
          {docInfo?.available === "true"
            ? user
              ? "Confirm Booking"
              : "Please Login"
            : "Doctor Not Available"}
        </button>
      </div>
    </div>
  </section>
);
};

export default Appointments;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Appointment.css";
// import { setHours, setMinutes } from "date-fns";
// import { useDispatch, useSelector } from "react-redux";
// import { getDoctorDetails } from "../../redux/actions/doctorActions";
// import { bookAppointment } from "../../redux/actions/appointmentActions";
// import { toast } from "react-hot-toast";

// const Appointments = () => {
//   const { id } = useParams();

//   const [docInfo, setDocInfo] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { doctor, doctorAppointments } = useSelector((state) => state.doctor);
//   const { user } = useSelector((state) => state.auth);

//   // 🔹 Fetch doctor details
//   useEffect(() => {
//     dispatch(getDoctorDetails(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (doctor) {
//       setDocInfo(doctor);
//     }
//   }, [doctor]);

//   // 🔹 Fetch booked slots when date changes
//   // useEffect(() => {
//   //   const formattedDate = extractDate(selectedDate);
//   //   dispatch(getDoctorBookedSlots(id, formattedDate));
//   // }, [dispatch, id, selectedDate]);

//   // 🔹 Generate all slots (9AM - 10PM)
//   const generateSlots = () => {
//     const slots = [];
//     let start = setHours(setMinutes(new Date(), 0), 9);
//     const end = setHours(setMinutes(new Date(), 0), 22);

//     while (start <= end) {
//       slots.push(new Date(start));
//       start = new Date(start.getTime() + 30 * 60000);
//     }

//     return slots;
//   };

//   // 🔹 Format date
//   const extractDate = (dateObj) => {
//     const day = String(dateObj.getDate()).padStart(2, "0");
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//     const year = dateObj.getFullYear();

//     return `${day}-${month}-${year}`;
//   };

//   // 🔹 Format time
//   const extractTime = (dateObj) => {
//     let hours = dateObj.getHours();
//     const minutes = dateObj.getMinutes();
//     const AmPm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12;
//     hours = hours ? hours : 12;

//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:00 ${AmPm}`;
//   };

//   // 🔹 Check if slot is booked
//   const isSlotBooked = (slot) => {
//     const slotDate = extractDate(selectedDate);
//     const slotTime = extractTime(slot);

//     return doctor?.some(
//       (item) => item.slotDate === slotDate && item.slotTime === slotTime
//     );
//   };

//   // 🔹 Check if past time (only for today)
//   const isPastTime = (slot) => {
//     const now = new Date();
//     return (
//       selectedDate.toDateString() === now.toDateString() && slot < now
//     );
//   };

//   // 🔹 Handle slot click
//   const handleSlotClick = (slot) => {
//     if (isSlotBooked(slot)) {
//       return toast.error("This slot is already booked");
//     }

//     if (isPastTime(slot)) {
//       return toast.error("Cannot select past time");
//     }

//     setSelectedSlot(slot);
//   };

//   // 🔹 Handle booking
//   const handleBooking = async () => {
//     if (!user) {
//       return navigate("/login");
//     }

//     if (!selectedSlot) {
//       return toast.error("Please select a time slot");
//     }

//     try {
//       const bookingData = {
//         userId: user._id,
//         doctorId: id,
//         slotDate: extractDate(selectedDate),
//         slotTime: extractTime(selectedSlot),
//         amount: docInfo?.fees,
//       };

//       await dispatch(bookAppointment(bookingData)).unwrap();

//       toast.success("Appointment booked successfully!");
//       navigate("/user/appointments");
//     } catch (err) {
//       toast.error(err);
//     }
//   };

//   return (
//     <section className="appointment-section">
//       <div className="appointment-wrapper">
        
//         {/* LEFT: Doctor */}
//         <div className="doctor-profile-card">
//           <img
//             src={`data:image/jpeg;base64,${docInfo?.image}`}
//             alt="Doctor"
//           />

//           <h4>{docInfo?.name}</h4>

//           <span
//             className={`status-badge ${
//               docInfo?.available === "true"
//                 ? "available"
//                 : "not-available"
//             }`}
//           >
//             {docInfo?.available === "true"
//               ? "Available"
//               : "Not Available"}
//           </span>

//           <p>Experience: {docInfo?.experience} years</p>
//           <p>Fee: ₹{docInfo?.fees}</p>
//         </div>

//         {/* RIGHT: Booking */}
//         <div className="booking-card">
//           <h5>Select Date</h5>

//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => {
//               setSelectedDate(date);
//               setSelectedSlot(null);
//             }}
//             minDate={new Date()}
//             dateFormat="d MMMM yyyy"
//           />

//           <h5 className="mt-3">Select Time Slot</h5>

//           <div className="slots-container">
//             {generateSlots().map((slot, index) => {
//               const booked = isSlotBooked(slot);
//               const past = isPastTime(slot);

//               return (
//                 <button
//                   key={index}
//                   className={`slot-btn 
//                     ${booked || past ? "booked" : ""}
//                     ${
//                       selectedSlot?.getTime() === slot.getTime()
//                         ? "selected"
//                         : ""
//                     }`}
//                   disabled={booked || past}
//                   onClick={() => handleSlotClick(slot)}
//                 >
//                   {slot.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             className="book-btn mt-3"
//             disabled={
//               docInfo?.available !== "true" || !user || !selectedSlot
//             }
//             onClick={handleBooking}
//           >
//             {!user
//               ? "Please Login"
//               : docInfo?.available !== "true"
//               ? "Doctor Not Available"
//               : "Confirm Booking"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Appointments;