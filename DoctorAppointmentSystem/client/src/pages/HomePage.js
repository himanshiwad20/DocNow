import React from "react";
import Slider from "../components/Slider/Slider.js";
import Facility from "../components/Static/Facility/Facility.js";
import ShortIntro from "../components/Static/ShortInro/ShortIntro.js";
import WhyChoose from "../components/Static/WhyChoose/WhyChoose.js";
import ContactMessage from "../components/Static/ContactMessage/ContactMessage.js";
import PatentReviews from "../components/Static/PatientReview/PatientReview.js";

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Facility/>
      <ShortIntro/>
      <WhyChoose/>
      <PatentReviews/>
      <ContactMessage/>
    </>
  );
};

export default HomePage;
