
import React from 'react'
import './Facility.css'
import FacilityData from './FacilityData.json'

const Facility = () => {
  return (
    <section className="facility-section">
      <div className="facility-wrapper">
        <h1 className='facilityHeading'>Our Facilities</h1>

        <div className='facility-container'>
          {FacilityData.map((d, i) => (
            <div className='facility-card' key={i}>
              <div className="icon-wrapper">
                <i className={d.icon}></i>
              </div>
              <h5 className='facility-title'>{d.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facility