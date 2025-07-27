import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const info = {
    email: email,
    password: password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset previous error

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      console.log(data)

      if (data.length === 0) {
        setErrorMessage('Incorrect email or password');
        return;
      }
      const data1 = JSON.parse(data);
      const u1 = data1[0];
      if (data1.length === 0) {
        setErrorMessage('Incorrect email or password');
        return;
      }
      if (u1.fields.email === info.email) {
        navigate(`/home?username=${encodeURIComponent(u1.fields.name)}&email=${encodeURIComponent(u1.fields.email)}`);
      } else {
        setErrorMessage('Incorrect email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Try again later.');
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
    <div className="auth-container">
      <form action="" onSubmit={handleSubmit}>
        <div className="auth-box">
          <div className="login-section">
            <h2>Sign In</h2>
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            <div className="field-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email Address'
              />
            </div>
            <div className="field-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </div>
            <div className="options-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
              <a href="#" className="link-forgot">Forgot Password?</a>
            </div>
            <button className="btn-login">Sign In</button>
          </div>
          <div className="register-section">
            <h2>Welcome to login</h2>
            <p>Don't have an account?</p>
            <button className="btn-signup" onClick={() => { navigate('/signup') }}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
