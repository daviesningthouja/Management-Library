import { useState } from "react";
import "./loginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

import axios from "axios";

const AdminLogin = () => {
  // const [enrollmentId, setenrollmentId] = useState('');
  // const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  // const [errors, setErrors] = useState({});
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  //pass toggle
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const navigate = useNavigate(); //Initialize useNavigate hook

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    let errors = {};
    if (!value.email) errors.email = "Enrollment ID is required";
    if (!value.password) errors.password = "Password is required";
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRememberMeChange = () => {
    setRememberMe((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/admin/login",
        value
      );

      if (response.data.token) {
         // Save token to localStorage or sessionStorage based on Remember Me
      if (rememberMe) {
        localStorage.setItem("Admintoken", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      } else {
        sessionStorage.setItem("Adminsessiontoken", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      }
        navigate("/admin/Dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        if (error.response.status === 404) {
          setErrors({ submit: "Enrollment ID not found." });
        } else if (error.response.status === 401) {
          setErrors({ submit: "Incorrect password. Please try again." });
        } else {
          setErrors({ submit: "Login failed. Please try again." });
        }
      } else {
        setErrors({ submit: "Network error. Please try again later." });
      }
    }
  };
  

  return (
    <main className="body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={value.email}
              onChange={handleChange}
              required
            />
            <FaUserCircle className="icons" />
            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={value.password}
              onChange={handleChange}
              required
            />
            <div type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaUnlock className="icons" />
              ) : (
                <FaLock className="icons" />
              )}
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="remember-forget">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Remenber me
            </label>
            <Link to="#"> Forget password?</Link>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/user/registration">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
