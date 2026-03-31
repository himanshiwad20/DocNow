import React, { useEffect } from "react";
import "./ShortInro.css";
import ImageHos from "../../../assets/about1.jpg"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../redux/actions/authActions";

const ShortIntro = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handleBooking = () => {
    if(user) {
      navigate('/doctors')
    } else {
      navigate('/login')
    }
  }
  return (
    <section className="intro-section">
      <div className="container intro-container">
        <div className="row align-items-center">

          <div className="col-lg-6 image-col">
            <div className="image-wrapper">
              <img src={ImageHos} alt="Hospital" className="hos-image" />
            </div>
          </div>

          <div className="col-lg-6 text-col">
            <h1 className="intro-title">
              Welcome to <span>DocNow</span>
            </h1>

            <h5 className="intro-subtitle">
              A Super Specialty Hospital
            </h5>

            <p className="intro-text">
              Our hospital is a modern healthcare facility committed to providing
              high-quality medical services with a patient-first approach.
              We offer a wide range of medical consultations across multiple
              specialties, supported by experienced doctors and well-trained staff.
            </p>

            <p className="intro-text">
              With our online appointment system, patients can schedule visits
              easily, reduce waiting times, and access healthcare services
              seamlessly. We strive to deliver reliable, compassionate,
              and timely medical care.
            </p>

            <button className="intro-btn" onClick={handleBooking}>
              Book an Appointment
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ShortIntro;