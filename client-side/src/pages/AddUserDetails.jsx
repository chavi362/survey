import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/form.scss';
import api from '../Api';
import { UserContext } from '../App';

const AddUserDetails = ({ updateUserContext }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    ageID: "",
    genderID: "",
    areaID: "",
    sectorID: "",
    role: "user",
    educationID: "",
    incomeID: ""
  });

  useEffect(() => {
    setFormUser((prevFormUser) => ({
      ...prevFormUser,
      id: user.id,
      username: user.username
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
        updateUserContext(updatedFormUser);
        navigate(`/users/${updatedFormUser.id}/home`);
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
                          id="username"
                          className="form-control"
                          placeholder="Your username"
                          value={formUser.username}
                          onChange={handleChange}
                          name="username"
                          required
                        />
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="email"
                          className="form-control"
                          placeholder="Your email"
                          value={formUser.email}
                          onChange={handleChange}
                          name="email"
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="firstName"
                          className="form-control"
                          placeholder="Your first name"
                          value={formUser.firstName}
                          onChange={handleChange}
                          name="firstName"
                          required
                        />
                        <label className="form-label" htmlFor="firstName">
                          First Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="lastName"
                          className="form-control"
                          placeholder="Your last name"
                          value={formUser.lastName}
                          onChange={handleChange}
                          name="lastName"
                          required
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="ageID"
                          className="form-control"
                          placeholder="Your age ID"
                          value={formUser.ageID}
                          onChange={handleChange}
                          name="ageID"
                          required
                        />
                        <label className="form-label" htmlFor="ageID">
                          Age ID
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="genderID"
                          className="form-control"
                          placeholder="Your gender ID"
                          value={formUser.genderID}
                          onChange={handleChange}
                          name="genderID"
                          required
                        />
                        <label className="form-label" htmlFor="genderID">
                          Gender ID
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="areaID"
                          className="form-control"
                          placeholder="Your area ID"
                          value={formUser.areaID}
                          onChange={handleChange}
                          name="areaID"
                          required
                        />
                        <label className="form-label" htmlFor="areaID">
                          Area ID
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="sectorID"
                          className="form-control"
                          placeholder="Your sector ID"
                          value={formUser.sectorID}
                          onChange={handleChange}
                          name="sectorID"
                          required
                        />
                        <label className="form-label" htmlFor="sectorID">
                          Sector ID
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="educationID"
                          className="form-control"
                          placeholder="Your education ID"
                          value={formUser.educationID}
                          onChange={handleChange}
                          name="educationID"
                          required
                        />
                        <label className="form-label" htmlFor="educationID">
                          Education ID
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="incomeID"
                          className="form-control"
                          placeholder="Your income ID"
                          value={formUser.incomeID}
                          onChange={handleChange}
                          name="incomeID"
                          required
                        />
                        <label className="form-label" htmlFor="incomeID">
                          Income ID
                        </label>
                      </div>

                      <button
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="submit"
                      >
                        Create Account
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Discover a World of Opportunities</h4>
                    <p className="small mb-0">
                      Welcome to our platform where you can explore and connect with a community driven by innovation and collaboration. Unleash your potential as we strive to make a positive impact together. Join us on this exciting journey!
                    </p>
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
