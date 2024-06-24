// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../Api';
// import '../sass/form.scss'

// const Login = (props) => {
//   const navigate = useNavigate();
//   const [formUser, setFormUser] = useState({
//     userName: '',
//     password: '',
//   });
//   const [isManager, setIsManager] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//     const response = await api.post('/login', {
//         userName: formUser.userName,
//         password: formUser.password
//       });

//       const user = response.data;
//       if (response.error) {
//         console.error('Error fetching user:', response.error);
//         navigate('/error');
//         return;
//       }

//       if (user) {
//         sessionStorage.setItem("userCode", user[0].userCode);
//         const userContextData = {
//           id: user.id,
//           name: user.name,
//           userName: user.userName,
//           email: user.email,
//           address: user.address,
//           phone: user.phone,
//           company: user.company,
//         };
//         console.log("userContextData ",userContextData);

//         props.updateUserContext(userContextData);
//         navigate(`/users/${user.id}/home`);
//       } else {
//         alert('User not found or incorrect email/password');
//       }
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       navigate('/error');
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleCreateNew = () => {
//     navigate('/register');
//   };

//   return (
//     <>
//       <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-xl-10">
//               <div className="card rounded-3 text-black">
//                 <div className="row g-0">
//                   <div className="col-lg-6">
//                     <div className="card-body p-md-5 mx-md-4">
//                       <div className="text-center">
//                         <img
//                           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
//                           style={{ width: '185px' }}
//                           alt="logo"
//                         />
//                         <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
//                       </div>

//                       <form onSubmit={handleSubmit}>
//                         <p>Please login to your account</p>
//                         <div className="form-outline mb-4">
//                           <input

//                             id="form2Example11"
//                             className="form-control"
//                             placeholder="userName"
//                             value={formUser.userName}
//                             onChange={handleChange}
//                             name="userName"
//                           />
//                           <label className="form-label" htmlFor="form2Example11">
//                             Username
//                           </label>
//                         </div>

//                         <div className="form-outline mb-4">
//                           <input
//                             type="password"
//                             id="form2Example22"
//                             className="form-control"
//                             placeholder="Password"
//                             value={formUser.password}
//                             onChange={handleChange}
//                             name="password"
//                           />
//                           <label className="form-label" htmlFor="form2Example22">
//                             Password
//                           </label>
//                         </div>

//                         <div className="text-center pt-1 mb-5 pb-1">
//                           <button
//                             className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
//                             type="submit"
//                           >
//                             Log in
//                           </button>
//                           <br></br>
//                           <a className="text-muted" href="#!">
//                             Forgot password?
//                           </a>
//                         </div>
//                         <div className="d-flex align-items-center justify-content-center pb-4">
//                           <p className="mb-0 me-2">Don't have an account?</p>
//                           <button type="button" className="btn btn-outline-danger" onClick={handleCreateNew}>
//                             Create new
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                   <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
//                     <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                       <h4 className="mb-4">Discover a World of Opportunities/</h4>
//                       <p className="small mb-0">
//                         Welcome to our platform where you can explore and connect with a community driven by innovation and collaboration.
//                         Unleash your potential as we strive to make a positive impact together. Join us on this exciting journey!
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section >
//     </>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverRequests } from "../Api";
import '../css/Login.css';

function LogIn() {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const log = async () => {
    if (userEmail == "" || userPassword == "") {
      alert("חובה למלא את כל הפרטים!");
      return;
    }
    // if (!isEmailValid()) {
    //   alert("כתובת האימייל אינה תקינה");
    //   return;
    // }

    const url = "login";
    const body = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    //   serverRequests("POST", url, body)
    //     .then((response) => {
    //       console.log(response);
    //       if (!response.ok) {
    //         // setLoginError("incorrect password or username");
    //         return;
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       if (data) {
    //         localStorage.setItem("currentUser", JSON.stringify(data.user));
    //         setUser(data.user);
    //         setUserEmail("");
    //         setUserPassword("");
    //         // setLoginError('Registration successful');
    //         navigate("/home");
    //       }
    //     })
    //     .catch((error) => {
    //       setLoginError("Error", error);
    //     });

    //   if (data) {
    //     sessionStorage.setItem("userCode", login[0].userCode);
    //     if (login[0].role == 0) {
    //       setIsManager(true);
    //     } else {
    //       navigate("/home");
    //     }
    //   } else {
    //     alert("משתמש לא קיים או שאחד הפרטים שגויים ");
    //   }
    // };

    // const isEmailValid = () => {
    //   const pattern =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //   return pattern.test(userEmail.toLowerCase());
    // };

    try {
      const response = await serverRequests("POST", url, body);
      if (!response.ok) {
        alert("משתמש לא קיים או שאחד הפרטים שגויים ");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("userCode", data.userCode);
      if (data.user.role === "admin") {
        navigate("/managerPage");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error in log function:", error);
      alert("שגיאה בשרת");
    }
  };

  return (
    <div>
      <h1 className="webTitle">סקרים</h1>
      <div className="logInBox">
        <h1 className="logIn">משתמש קיים</h1>
        <input
          type="text"
          placeholder="הכנס כתובת אימייל"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="הכנס סיסמא"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <br />
        <div className="submitBtn">
          <button id="logInBtn" className="logInBtn" onClick={log}>
            היכנס
          </button>
          <button
            className="logInBtn"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            משתמש חדש
          </button>
        </div>
      </div>
    </div>)
}

export default LogIn;
