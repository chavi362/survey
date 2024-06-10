import React, { useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';

const CompleteRegistration = () => {
  // const location = useLocation();
  // const history = useHistory();
  const { username, email } = location.state || {};
  const [ageID, setAgeID] = useState('');
  const [genderID, setGenderID] = useState('');
  const [areaID, setAreaID] = useState('');
  const [sectorID, setSectorID] = useState('');

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    // Send data to server to complete registration
    // Assuming the API returns a success response
    // history.push('/welcome');
  };

  return (
    <div className="container">
      <h1>Complete Registration</h1>
      <form onSubmit={handleCompleteRegistration}>
        <div>
          <label>Age Group</label>
          <select value={ageID} onChange={(e) => setAgeID(e.target.value)} required>
            <option value="">Select Age Group</option>
            <option value="1">1990-2000</option>
            <option value="2">2001-2010</option>
            <option value="3">2011-2020</option>
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select value={genderID} onChange={(e) => setGenderID(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>
        <div>
          <label>Area</label>
          <select value={areaID} onChange={(e) => setAreaID(e.target.value)} required>
            <option value="">Select Area</option>
            <option value="1">North</option>
            <option value="2">Center</option>
            <option value="3">South</option>
          </select>
        </div>
        <div>
          <label>Sector</label>
          <select value={sectorID} onChange={(e) => setSectorID(e.target.value)} required>
            <option value="">Select Sector</option>
            <option value="1">Public</option>
            <option value="2">Private</option>
          </select>
        </div>
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
