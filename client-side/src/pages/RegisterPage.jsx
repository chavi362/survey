import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API';

const Register = ({ updateUserContext }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`users?userName=${user.userName}`);
      const users = response.data;
      if (users.length) {
        alert("User with this userName already exists");
      } else {
        if (!isStrongPassword(user.password)) {
          alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
          return;
        }
        const registerResponse = await api.post('register', { userName: user.userName, password: user.password });
        const userContextData = {
          id: registerResponse.data.id,
          userName: registerResponse.data.userName
        };
        updateUserContext(userContextData);
        navigate(`/create-account`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <section className="vh-100 gradient-form" style={{ backgroundColor: '#eee' }}>
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
                      <p>Please register</p>

                      <div className="form-outline mb-4">
                        <input
                          id="form2Example11"
                          className="form-control"
                          placeholder="Username"
                          value={user.userName}
                          onChange={handleChange}
                          name="userName"
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          value={user.password}
                          onChange={handleChange}
                          name="password"
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block btn-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Register
                        </button>
                        <a className="text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have an account?</p>
                        <button type="button" className="btn btn-outline-danger" onClick={() => navigate('/login')}>
                          Log in
                        </button>
                      </div>
                    </form>
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

export default Register;
