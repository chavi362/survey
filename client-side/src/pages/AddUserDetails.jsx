import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/form.scss';
import { serverRequests } from "../Api";
import { UserContext } from '../App';
import useGetData from '../hooks/useGetData'; 

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

  const [ages, setAges] = useState([]);
  const [genders, setGenders] = useState([]);
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [incomeLevels, setIncomeLevels] = useState([]);

  const [agesData, agesError, agesLoading] = useGetData('properties/ages');
  const [gendersData, gendersError, gendersLoading] = useGetData('properties/genders');
  const [areasData, areasError, areasLoading] = useGetData('properties/areas');
  const [sectorsData, sectorsError, sectorsLoading] = useGetData('properties/sectors');
  const [educationLevelsData, educationLevelsError, educationLevelsLoading] = useGetData('properties/education_levels');
  const [incomeLevelsData, incomeLevelsError, incomeLevelsLoading] = useGetData('properties/family_income_levels');

  useEffect(() => {
    if (agesData) setAges(agesData);
  }, [agesData]);

  useEffect(() => {
    if (gendersData) setGenders(gendersData);
  }, [gendersData]);

  useEffect(() => {
    if (areasData) setAreas(areasData);
  }, [areasData]);

  useEffect(() => {
    if (sectorsData) setSectors(sectorsData);
  }, [sectorsData]);

  useEffect(() => {
    if (educationLevelsData) setEducationLevels(educationLevelsData);
  }, [educationLevelsData]);

  useEffect(() => {
    if (incomeLevelsData) setIncomeLevels(incomeLevelsData);
  }, [incomeLevelsData]);

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
      debugger;
      const response = await serverRequests('PUT', `users/${user.id}`, updatedFormUser);
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

  const isLoading = agesLoading || gendersLoading || areasLoading || sectorsLoading || educationLevelsLoading || incomeLevelsLoading;

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

                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
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
                          <select
                            id="ageID"
                            className="form-control"
                            value={formUser.ageID}
                            onChange={handleChange}
                            name="ageID"
                            required
                          >
                            <option value="">Select Age Range</option>
                            {ages.map(age => (
                              <option key={age.ageID} value={age.ageID}>
                                {age.startYear} - {age.endYear}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="ageID">
                            Age Range
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            id="genderID"
                            className="form-control"
                            value={formUser.genderID}
                            onChange={handleChange}
                            name="genderID"
                            required
                          >
                            <option value="">Select Gender</option>
                            {genders.map(gender => (
                              <option key={gender.genderID} value={gender.genderID}>
                                {gender.gender}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="genderID">
                            Gender
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            id="areaID"
                            className="form-control"
                            value={formUser.areaID}
                            onChange={handleChange}
                            name="areaID"
                            required
                          >
                            <option value="">Select Area</option>
                            {areas.map(area => (
                              <option key={area.areaID} value={area.areaID}>
                                {area.area}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="areaID">
                            Area
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            id="sectorID"
                            className="form-control"
                            value={formUser.sectorID}
                            onChange={handleChange}
                            name="sectorID"
                            required
                          >
                            <option value="">Select Sector</option>
                            {sectors.map(sector => (
                              <option key={sector.sectorID} value={sector.sectorID}>
                                {sector.sector}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="sectorID">
                            Sector
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            id="educationID"
                            className="form-control"
                            value={formUser.educationID}
                            onChange={handleChange}
                            name="educationID"
                            required
                          >
                            <option value="">Select Education Level</option>
                            {educationLevels.map(education => (
                              <option key={education.educationID} value={education.educationID}>
                                {education.education_level}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="educationID">
                            Education Level
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            id="incomeID"
                            className="form-control"
                            value={formUser.incomeID}
                            onChange={handleChange}
                            name="incomeID"
                            required
                          >
                            <option value="">Select Income Level</option>
                            {incomeLevels.map(income => (
                              <option key={income.incomeID} value={income.incomeID}>
                                {income.startRange} - {income.endRange}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="incomeID">
                            Income Level
                          </label>
                        </div>

                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Create Account
                        </button>
                      </form>
                    )}
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
