import React, { useState } from 'react';
import './App.css';
import './Vendor.css'
import v1 from './Image/d1.jpg'
import v2 from './Image/d2.jpg'
import v3 from './Image/d3.jpg'
import v4 from './Image/d4.jpg'

// Vendor data

const vendors = [
    {id: 1,name: 'Dr. Nishant Sojitra',succress_rate: 87,specialist:'PhD in Nutrition',image: v1},
    {id: 2,name: 'Dr. Dhruv Tejani',succress_rate: 85,specialist:' PhD in Dietetics',image: v2},
    {id: 3,name: 'Dr. Fenil Patel',succress_rate: 83,specialist:'PhD in Clinical Nutrition',image: v3},
    { id: 4,name: 'Dr. Poojan Thakker',succress_rate: 84,specialist:'PhD in Food Science',image: v4},
  ];


const Vendor = () => {
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="vendor-container">
      <div className="image-container">
        <img src={selectedVendor.image} alt={selectedVendor.name} className="vendor-image" />
      </div>
      <div className="vendor-list">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`vendor-item ${selectedVendor.id === vendor.id ? 'selected' : ''}`}
            onClick={() => handleVendorClick(vendor)}
          >
            <h3>{vendor.name}</h3>
            <p>Succress Rate - {vendor.succress_rate} %</p>
            <p>
              {vendor.specialist}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendor;
