
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import banner from './img/docnowBanner1.png'
import banner4 from './img/docnowBanner2.jpg'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUserData } from '../../redux/actions/authActions';

const Slider = () => {

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

  const slides = [
    {
      image: banner,
      title: "Find the Care You Need, Faster",
      subtitle: "Book appointments instantly with trusted doctors."
    },
    {
      image: banner4,
      title: "Advanced & Intelligent Healthcare",
      subtitle: "Smart scheduling. Seamless medical experience."
    }
  ]

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop={true}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="slide-container">
            <img src={slide.image} alt="banner" className="slide-image" />

            <div className="overlay"></div>

            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="slider-btn" onClick={handleBooking}>Book Appointment</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider