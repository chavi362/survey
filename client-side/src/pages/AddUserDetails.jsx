import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/form.scss';
import api from '../Api';
import { UserContext } from '../App';
import useGetData from '../hooks/useGetData';

const AddUserDetails = ({ updateUserContext }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    ageID: "",
    sectorID: ""
  });

  const [ages, ageError, ageLoading] = useGetData('/properties/ages');
  const [sectors, sectorError, sectorLoading] = useGetData('/properties/sectors');

  useEffect(() => {
    setFormUser((prevFormUser) => ({
      id: user.id,
      userName: user.userName,
      ...prevFormUser,
    }));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormUser = { ...formUser, id: user.id };
      const response = await api.put(`users/${user.id}`, updatedFormUser);

      if (response.error) {
        console.error('Error updating user details:', response.error);
      } else {
        const updatedUser = formUser;
        updateUserContext(updatedUser);
        navigate(`/users/${updatedUser.id}/home`);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p>Let's take more details....</p>
                      <div className="form-outline mb-4">
                        <input
                          id="email"
                          className="form-control"
                          placeholder="Your email"
                          value={formUser.email}
                          onChange={handleChange}
                          name="email"
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          id="phone"
                          className="form-control"
                          placeholder="Your phone"
                          value={formUser.phone}
                          onChange={handleChange}
                          name="phone"
                        />
                        <label className="form-label" htmlFor="phone">
                          Phone
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          id="full-name"
                          className="form-control"
                          placeholder="Your name"
                          value={formUser.name}
                          onChange={handleChange}
                          name="name"
                        />
                        <label className="form-label" htmlFor="full-name">
                          Full Name
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        {ageLoading ? (
                          <p>Loading ages...</p>
                        ) : ageError ? (
                          <p>Error loading ages: {ageError}</p>
                        ) : (
                          <select
                            id="age"
                            className="form-control"
                            value={formUser.ageID}
                            onChange={handleChange}
                            name="ageID"
                          >
                            <option value="">Select Age</option>
                            {ages.map(age => (
                              <option key={age.ageID} value={age.ageID}>
                                {age.startYear} - {age.endYear}
                              </option>
                            ))}
                          </select>
                        )}
                        <label className="form-label" htmlFor="age">
                          Age
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        {sectorLoading ? (
                          <p>Loading sectors...</p>
                        ) : sectorError ? (
                          <p>Error loading sectors: {sectorError}</p>
                        ) : (
                          <select
                            id="sector"
                            className="form-control"
                            value={formUser.sectorID}
                            onChange={handleChange}
                            name="sectorID"
                          >
                            <option value="">Select Sector</option>
                            {sectors.map(sector => (
                              <option key={sector.sectorID} value={sector.sectorID}>
                                {sector.sector}
                              </option>
                            ))}
                          </select>
                        )}
                        <label className="form-label" htmlFor="sector">
                          Sector
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUserDetails;
