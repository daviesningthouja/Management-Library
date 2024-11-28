// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../index.js";
import { Link , useNavigate} from "react-router-dom";
import {Admin_Catalog} from "../index.js";
import { useState,useEffect } from "react";
import './dashboard.css'
import axios from "axios";
import { bouncy } from "ldrs";
const Admin_Dashboard = () =>{
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState();
  useEffect(() => {
    const token =
    localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
    
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }
    
    const fetchRecentLogins = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8080/api/admin/recent-logins', {
            headers: {
              Authorization: `Bearer ${token}`, // Use admin token
            },
          });
          
        setLoading(false);
        setLogs(response.data);
  
      } catch (error) {
        console.error('Error fetching recent logins:', error);
        setError("failed to load login logs")
      }finally{
        setTimeout(() => setLoading(false), 1000); 
      }
    };

    fetchRecentLogins(); // Fetch logs initially
    
    // Polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchRecentLogins();
    }, 5000);
    
    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);
  bouncy.register();
  if(loading){
    return <Admin_DashboardLayout>
      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
    </Admin_DashboardLayout>
  }
  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }

  return (
    <Admin_DashboardLayout>
      <main className="wrapper_dashboard">
      
        <Admin_Catalog/>
        <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <i className="bx bx-receipt"></i>
              <h3>Usage Logs</h3>
              <i className="bx bx-filter"></i>
              <i className="bx bx-search"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>EnrollmentId</th>
                  <th>Action</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
              {logs.map(log => (
                <tr key={log._id}>
                  <td>{log.name}</td>
                  <td>{log.userId}</td>
                  <td>{log.action}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
                {/* <tr>
                  <td>
                   
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>
                    <p>544792592</p>
                  </td>
                </tr>
                <tr>
                  <td>
                   
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>
                    <p>544792592</p>
                  </td>
                </tr>
                <tr>
                  <td>
                   
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>
                    <p>544792592</p>
                  </td>
                </tr>
                <tr>
                  <td>
                   
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <p>The Mocking Bird</p>
                  </td>
                  <td>
                    <p>544792592</p>
                  </td>
                </tr>
                 */}
              </tbody>
            </table>
          </div>
        {/*  <div>
       <h1>Recent Student Logins</h1>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            User: {log.name},EnrollmentId:{log.userId}, Action: {log.action}, Time: {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div> */}

          {/* <div className="reminders">
            <div className="header">
              <i className="bx bx-note"></i>
              <h3>Remiders</h3>
              <i className="bx bx-filter"></i>
              <i className="bx bx-plus"></i>
            </div>
            <ul className="task-list">
              <li className="completed">
                <div className="task-title">
                  <i className="bx bx-check-circle"></i>
                  <p>Start Our Meeting</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
              <li className="completed">
                <div className="task-title">
                  <i className="bx bx-check-circle"></i>
                  <p>Analyse Our Site</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
              <li className="not-completed">
                <div className="task-title">
                  <i className="bx bx-x-circle"></i>
                  <p>Play Footbal</p>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
            </ul>
          </div> */}
        </div>
      </main>
    </Admin_DashboardLayout>
  );
}

export default Admin_Dashboard;
