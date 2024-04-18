import React, { useState } from 'react';
import { getLoginAPI } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from "../../assets/img/logo2.png";
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const onFormSubmit = (e) => {
    e.preventDefault(); 
    const data = {
      email: email,
      password: password
    };
    getLoginAPI(data)
      .then((res) => {
        if (res.data.status === 'Success') {
          localStorage.setItem('accessToken', res.data.data.token);
          navigate('/dashboard');
        } else {
          console.log('Error: Login failed');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              <div className="account-logo">
                <Link href="#">
                  <img src={logo2} alt="Dreamguy's Technologies" />
                </Link>
              </div>
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  <form onSubmit={onFormSubmit}>
                    <div className="input-block mb-4">
                      <label className="col-form-label">Email Address</label>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-block mb-4">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                          <Link className="text-muted" href="forgot-password.html">
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="position-relative">
                        <input
                          className="form-control"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                        />
                        <span className="fa-solid fa-eye-slash" id="toggle-password"></span>
                      </div>
                    </div>
                    <div className="input-block mb-4 text-center">
                      <button className="btn btn-primary account-btn" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="account-footer">
                      <p>
                        Don't have an account yet? <a href="register.html">Register</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
