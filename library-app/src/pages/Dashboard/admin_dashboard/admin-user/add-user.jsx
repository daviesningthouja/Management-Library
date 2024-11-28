// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./adduser.css";
import { bouncy } from "ldrs";
const Add_User = () => {
const navigate = useNavigate();
const [loading,setLoading] = useState('');
const [error, setError] = useState("");

const [formData, setFormData] = useState({
name: "",
enrollmentId: "",
department: "",
contact: "",
email: "",
password: "",
});

const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token =
      localStorage.getItem("Admintoken") ||
      sessionStorage.getItem("Adminsessiontoken");
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }

    const config = {
      header: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
   
    try {

      const response = await axios.post(
        "http://localhost:8080/api/admin/add-user",
        formData,
        config
      );

      console.log(response.data);
      if (response.data) {
        alert("Student added successfully!");
      }
    } catch (error) {
      console.error(
        "Error adding student:",
        error.response?.data || error.message
      );
      alert("Failed to add user");
      //navigate('/admin/Dashboard/Administrator')
      //setError("Failed to add user")
      
    }finally{
        setTimeout(() => setLoading(false), 500);

    }
  };
  bouncy.register();
  if (loading) {
    return (
      <Admin_DashboardLayout>
      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
    </Admin_DashboardLayout>
    );
  }
  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }

  return (
    <Admin_DashboardLayout>
      <main className="wrapper_add-user">
        <div className="regis-header">
          <div className="arrow">
            <Link to="/admin/dashboard/administrator">
              <i className="bx bx-arrow-back"></i>
            </Link>
          </div>
          <div className="detail">
            <h3>Entry Student Detail</h3>
          </div>
        </div>
        <div className="regis-user-form">
          <form onSubmit={handleSubmit}>
            <div className="regis-img">
              <label>Image</label>
              <div>
                <img className="img-b" src="" alt="" name="image" />
              </div>
              <input className="pos-btn" type="file" name="image" />
            </div>
            <div className="regis-name">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="regis-id">
              <label>Enrollment ID</label>
              <input
                type="number"
                name="enrollmentId"
                value={formData.enrollmentId}
                onChange={handleChange}
              />
            </div>
            <div className="regis-department">
              <label>Department</label>
              <div className="radio-box">
                <input
                  type="radio"
                  name="department"
                  value="Computer Science"
                  onChange={handleChange}
                />
                Computer science
                <input
                  type="radio"
                  value="Civil"
                  name="department"
                  onChange={handleChange}
                />
                Civil
                <input
                  type="radio"
                  name="department"
                  value="Mechanical"
                  onChange={handleChange}
                />
                Mechanical
                <input
                  type="radio"
                  value="Electronic & Communication"
                  name="department"
                  onChange={handleChange}
                />
                Electronic & Communication
                <input
                  type="radio"
                  name="department"
                  value="Electrical"
                  onChange={handleChange}
                />
                Electrical
              </div>
            </div>
            <div className="regis-contact">
              <label htmlFor="">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="regis-email">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="regis-ps">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="sub-btn">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </main>
    </Admin_DashboardLayout>
  );
};

export default Add_User;
