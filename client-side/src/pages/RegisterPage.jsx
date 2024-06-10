import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Send data to server for the first step of registration
    // Assuming the API returns a success response
    // history.push('/complete-registration', { username, email });
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default RegisterPage;
