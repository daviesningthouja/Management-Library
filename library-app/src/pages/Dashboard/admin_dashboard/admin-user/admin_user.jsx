// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import './user.css'
import { bouncy } from "ldrs";


const Admin_User = () =>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // search query state
  const [filteredStudents, setFilteredStudents] = useState([]); // filtered students to display
  const [error, setError] = useState('');
  useEffect(()=>{
    setLoading(true);
    const token = localStorage.getItem('Admintoken') || sessionStorage.getItem('Adminsessiontoken');
    
    console.log("Token:", token);
    
    if(!token){
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }

    const config = {
    headers: {
      Authorization:`Bearer ${token}`,
      
    },
  }
    const fetchUserData = async () => {
      try {
      const response = await fetch(
        'http://localhost:8080/api/dashboard/data', config
      );
      
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json(); // Assuming JSON response
      setStudents(data); // Save students data
      setFilteredStudents(data); // Initially display all students      
   
     
    }catch (error) {
      console.error(error);
      setError('Error, Failed to fetch student data')
    } finally {
      setTimeout(() => setLoading(false), 100) ;
    }
  };
  
  fetchUserData();
}, [navigate]);

console.log(students)
// Handle the search functionality
const handleSearch = (e) => {
  const searchTerm = e.target.value.toLowerCase();
  setSearchQuery(searchTerm);

  // Filter students based on the search query
  const filtered = students.filter((student) => {
    const name = student.name?.toLowerCase() || ''; // Check if student.name exists
    const enrollmentId = student.enrollmentId?.toString().toLowerCase() || ''; // Convert enrollmentId to string and check if it exists
    const department = student.department?.toLowerCase() || ''; // Check if student.department exists
    const contact = student.contact?.toLowerCase() || ''; // Check if student.contact exists

    return (
      name.includes(searchTerm) ||
      enrollmentId.includes(searchTerm) ||
      department.includes(searchTerm) ||
      contact.includes(searchTerm)
    );
  });

  setFilteredStudents(filtered); // Update the filtered students
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
      <main className="wrapper_admin-user">
      <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <Link to="/admin/Dashboard">
              <li>
                <a href='#' > Catalog </a>
              </li>
              </Link>
              <h2>/</h2>
              
              <Link to="/admin/Dashboard/Administrator">
              <li>
                <a href='#' className='active'>User</a>
              </li>
              </Link>
            </ul>
          </div>
          
        </div>
      <div className="bottom-data">
          <div className="orders">
            <div className="header">
            <i className='bx bxs-user-detail'></i> 
              <h3>Students</h3>
              
              <div className="form-input">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="search-btn" type="submit">search</button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Enrollment Id</th>
                  <th>Name</th> 
                  <th>Department</th>
                  <th>contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="body-form">
              {loading ? (
                  <tr><td colSpan="5">Loading...</td></tr>
                ) : (
                  filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.enrollmentId}>
                        <td>{student.enrollmentId}</td>
                        <td>{student.name}</td>
                        <td>{student.department}</td>
                        <td>{student.contact}</td>
                        <td><Link to={`/admin/user/detail/${student._id}`}>View</Link></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5">No students found</td></tr>
                  )
                )}
               
              </tbody>
            </table>
          </div>
        </div>
        
       
      </main>
    </Admin_DashboardLayout>
  );
}

export default Admin_User;
