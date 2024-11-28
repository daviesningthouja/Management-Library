import React from "react";
import "./registration.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  
  const [value, setValue] = useState({
    name: '',
    enrollmentId: '',
    email: '',
    password: '',
    
  });

  const [error, setError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleToggle = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  setSuccessMessage('');

    if (!isChecked) {
      alert('You must accept the terms and conditions.');
      return;
    }

    if (value.password !== value.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/signup", {
        name: value.name,
        enrollmentId: value.enrollmentId,
        email: value.email,
        password: value.password,
      });

      console.log('User registered:', response.data);
      setSuccessMessage('Registration successful! Please log in.');
      setValue({
        name: '',
        enrollmentId: '',
        email: '',
        password: '',
        
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };


  return (
    <div className="body">
      <div className="wrapper1">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_box">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={value.name}
              required
            />
          </div>

          <div className="input_box">
            <input
              type="text"
              name="enrollmentId"
              placeholder="Enter your enrollment id"
              onChange={handleChange}
              value={value.enrollmentId}
              required
            />
          </div>

          <div className="input_box">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={value.email}
              required
            />
          </div>

          <div className="input_box">
            <input
              type="text"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              value={value.password}
              required
            />
          </div>

          <div className="input_box">
            <input
              type="text "
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              value={value.confirmPassword}
              required
            />
          </div>

          <div className="policy">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={isChecked}
            />
            <h3>I accept all terms & condition</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>

          <div className="input_box button">
            <button type="Submit">Register</button>
          </div>
          
          <div className="text">
            <h3>
              Already have an account? <Link to="/user/login">Login now</Link>{" "}
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
