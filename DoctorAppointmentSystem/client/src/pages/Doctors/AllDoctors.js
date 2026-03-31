

import React, { useEffect } from "react";
import "./AllDoctors.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorActions";

const AllDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);

  return (
    <section className="doctor-section">
      <div className="doctor-header">
        <h2>Our Medical Specialists</h2>
        <p>Select a doctor and book your appointment instantly</p>
      </div>

      <div className="doctor-grid">
        {doctors?.map((d) => (
          <NavLink
            to={`/doctors/${d._id}`}
            className="doctor-card"
            key={d._id}
          >
            <div className="doctor-img-wrapper">
              <img
                src={`data:image/jpeg;base64,${d.image}`}
                alt={d.name}
              />
            </div>

            <div className="doctor-info">
              <h5>{d.name}</h5>
              <span className="degree">{d.degree}</span>

              <div className="specialization">
                {d.specialization}
              </div>

              <button className="view-btn">
                View Profile →
              </button>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default AllDoctors;