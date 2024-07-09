// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../sass/form.scss';
// import { serverRequests } from "../Api";
// import Cookies from 'js-cookie';

// const Register = ({ updateUserContext }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     userName: '',
//     password: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = `users?userName=${user.userName}`;
//     try {
//       const response = await serverRequests("GET", url);
//       const users = await response.json(); 
//       console.log(users)

//       if (users.length) {
//         alert("User with this userName already exists");
//       } else {
//         if (!isStrongPassword(user.password)) {
//           alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
//           return;
//         }
//         const registerResponse = await serverRequests("POST", 'register', { userName: user.userName, password: user.password });
//         const data = await registerResponse.json(); 
//         console.log(data)
//         const userContextData =data.user
//         Cookies.set('token', data.token, { expires: 1 });
//         updateUserContext(userContextData);
//         navigate(`/create-account`);
//       }
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const isStrongPassword = (password) => {
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     return passwordRegex.test(password);
//   };

//   return (
//     <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-xl-10">
//             <div className="card rounded-3 text-black">
//               <div className="row g-0">
//                 <div className="col-lg-6">
//                   <div className="card-body p-md-5 mx-md-4">
//                     <div className="text-center">
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                       <p>Please register</p>
//                       <div className="form-outline mb-4">
//                         <input
//                           id="form2Example11"
//                           className="form-control"
//                           placeholder="Phone number or userName address"
//                           value={user.userName}
//                           onChange={handleChange}
//                           name="userName"
//                         />
//                         <label className="form-label" htmlFor="form2Example11">
//                           userName
//                         </label>
//                       </div>

//                       <div className="form-outline mb-4">
//                         <input
//                           type="password"
//                           id="form2Example22"
//                           className="form-control"
//                           placeholder="Password"
//                           value={user.password}
//                           onChange={handleChange}
//                           name="password"
//                         />
//                         <label className="form-label" htmlFor="form2Example22">
//                           Password
//                         </label>
//                       </div>

//                       <div className="text-center pt-1 mb-5 pb-1">
//                         <button
//                           className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
//                           type="submit"
//                         >
//                           Register
//                         </button>
//                         <a className="text-muted" href="#!">
//                           Forgot password?
//                         </a>
//                       </div>
//                       <div className="d-flex align-items-center justify-content-center pb-4">
//                         <p className="mb-0 me-2">Already have an account?</p>
//                         <button type="button" className="btn btn-outline-danger" onClick={() => navigate('/login')}>
//                           Log in
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
//                   <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                     <h4 className="mb-4">We are more than just a company</h4>
//                     <p className="small mb-0">
//                       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
//                       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//                       laboris nisi ut aliquip ex ea commodo consequat.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../sass/form.scss';
import { serverRequests } from "../Api";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Register.css';

const Register = ({ updateUserContext }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `users?userName=${user.userName}`;
    try {
      const response = await serverRequests("GET", url);
      const users = await response.json();
      console.log(users);

      if (users.length) {
        alert("User with this userName already exists");
      } else {
        if (!isStrongPassword(user.password)) {
          alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
          return;
        }
        const registerResponse = await serverRequests("POST", 'register', { userName: user.userName, password: user.password });
        const data = await registerResponse.json();
        console.log(data);
        const userContextData = data.user;
        Cookies.set('token', data.token, { expires: 1 });
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
    <div className="register-container">
      <div className="register-form">
        <h2 className="text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="form2Example11"
              className="form-control"
              placeholder="Username"
              value={user.userName}
              onChange={handleChange}
              name="userName"
            />
            <label htmlFor="form2Example11">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              id="form2Example22"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              name="password"
            />
            <label htmlFor="form2Example22">Password</label>
          </div>
          <div className="text-center">
            <button className="btn btn-primary btn-block gradient-custom-2 sign-up-btn" type="submit">
              Register
            </button>
            
          </div>
          <div className="d-flex align-items-center justify-content-center pb-4 mt-3">
            <p className="mb-0 me-2">Already have an account?</p>
            <button type="button" className="btn btn-outline-danger login-btn" onClick={() => navigate('/login')}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
