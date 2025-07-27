import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const info = {
    name: name,
    email: email,
    password: password,
    number: phoneNumber
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Phone: ${phoneNumber}`);
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      if (data.name === info.name) {
        navigate(`/home?username=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}`)
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
        method: 'GET',
        mode: 'cors',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="register-box">
          <div className="signup-section">
            <h2>Sign Up</h2>
            <div className="input-field">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name'
              />
            </div>
            <div className="input-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </div>
            <div className="input-field">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder='Phone number'
              />
            </div>
            <div className="policy-row">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">I agree to the terms & conditions</label>
            </div>
            <button className="signup-btn" type='submit'>Sign Up</button>
          </div>
          <div className="signin-section">
            <h2>Already have an account?</h2>
            <p>Sign in to continue.</p>
            <button className="login-btn" onClick={() => { navigate('/') }}>Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
