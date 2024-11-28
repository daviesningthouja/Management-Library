
import { Admin_DashboardLayout } from "../../../index.js";
//import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Admin_Cat } from "../../index.js";
import "./admin.css";
import axios from "axios";
import { bouncy } from "ldrs";
// src/components/Dashboard/Dashboard.js
const Admin_Dash = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [adminList , setAdminList] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const token =
    localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
    setLoading(true);
  
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const data = await response.json();
        setAdminData(data); // Set the fetched admin data in state
        console.log(data)
        
      } catch (error) {
        console.error(error);
        alert("Error fetching admin data");
        setError("Failed to load admin data")
        // navigate('/user/login/admin', { replace: true });
      }finally{
        setTimeout(() => setLoading(false), 500);
      }
    };

    const fetchAdminList = async () => {
      // /setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/admin/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminList(response.data);  // Set the admin data into state
                // Turn off loading once data is fetched
      } catch (error) {
        console.error("Error fetching admin data:", error);
        // setLoading(false);
        setError("failed to load admin lists")
      }finally{
        setTimeout(() => setLoading(false), 500); 
      }
    }
    
  
    fetchAdminList();
    fetchAdminData();
  }, [navigate]);
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
      <main className="wrapper_admin-dash">
        <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <Link to="/admin/Dashboard">
                <li>
                  <a href="#"> Catalog </a>
                </li>
              </Link>
              <h2>/</h2>

              <Link to="/admin/Dashboard/Administrator">
                <li>
                  <a href="#" className="active">
                    Admin
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="contain-admin">
          <div className="rhs">
            <div className="ad-details">
              <div className="ad-img">
                {" "}
                <img src="" alt="" />
              </div>
              <div className="ad-detail">
              <h2>Admin ID: {adminData?._id}</h2>
              <p>Name: {adminData?.name}</p>
              <p>Department: {adminData?.department || "N/A"}</p>
              <p>Contact: {adminData?.contact}</p>
              </div>
            </div>
          </div>

          <div className="lhs">
            <div className="ad-action-btn">
              <Link to="/admin/user/add">
                <button>Add User</button>
              </Link>
              <Link to="/admin/book/add">
                <button>Add Book</button>
              </Link>
              <Link to="/admin/user">
                <button>Search User</button>
              </Link>
              <Link to="/admin/books">
                <button>Search Book</button>
              </Link>
              <Link to="/admin/loan-data">
                <button>New Loan</button>
              </Link>
            </div>
              <div className="ad-list">
                <div className="bottom-data">
                  <div className="orders">
                    <div className="header">
                      <h3>Admin List</h3>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Admin Id:</th>
                        </tr>
                      </thead>
                      <tbody>
                      {loading ? (
                        <tr><td colSpan="3">Loading...</td></tr>
                      ) : (
                        adminList && adminList.map((admin) => (
                          <tr key={admin._id}>
                            <td><p>{admin.name}</p></td>
                            <td>{admin.department || 'N/A'}</td>
                            <td>{admin._id}</td>
                          </tr>
                        ))
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      </main>
    </Admin_DashboardLayout>
  );
};

export default Admin_Dash;
