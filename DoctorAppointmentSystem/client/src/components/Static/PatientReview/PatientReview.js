

import React from "react";
import "./PatientReview.css";
import ReviewData from "./PatientReview.json";

const PatientReviews = () => {
  return (
    <section className="review-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Patients Say About Us</h2>
          <p>Real experiences from our happy patients</p>
        </div>

        <div className="row">
          {ReviewData.map((d) => (
            <div className="col-md-4 mb-4" key={d.id}>
              <div className="review-card">

                <img src={d.pic} alt={d.name} className="review-img" />

                <h5 className="review-name">{d.name}</h5>
                <p className="review-address">{d.address}</p>

                <div className="review-stars">
                  {[...Array(d.rating)].map((_, i) => (
                    <span key={i} className="fas fa-star"></span>
                  ))}
                </div>

                <h6 className="review-title">{d.commentTile}</h6>
                <p className="review-desc">{d.commentDescription}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientReviews;