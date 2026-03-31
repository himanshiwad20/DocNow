
import React from "react";
import "./WhyChoose.css";
import Image1 from "../../../assets/empoweredjourney.png";
import Image2 from "../../../assets/personalizedexcellence1.jpg";
import Image3 from "../../../assets/trustedcare1.jpg";

const WhyChoose = () => {
  return (
    <section className="why-section">
      <div className="container">

        <div className="section-header">
          <h1>Why Choose Us</h1>
          <p>
            We combine innovation, compassion, and excellence to deliver
            world-class healthcare experiences.
          </p>
        </div>

        <div className="row why-container">

          <div className="col-lg-4 col-md-6">
            <div className="why-card">
              <img src={Image2} alt="Personalized Excellence" />
              <h3>Personalized Excellence</h3>
              <p>
                Every patient receives tailored treatment plans supported by
                advanced technology and compassionate expertise for better,
                long-term health outcomes.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="why-card">
              <img src={Image3} alt="Trusted Care" />
              <h3>Trusted Care</h3>
              <p>
                Our experienced professionals deliver reliable, ethical,
                and patient-centered services with transparency and empathy
                at every stage of care.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="why-card">
              <img src={Image1} alt="Empowering Wellness" />
              <h3>Empowering Wellness</h3>
              <p>
                We promote preventive care and informed decision-making,
                empowering patients to live healthier and more sustainable lives.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChoose;