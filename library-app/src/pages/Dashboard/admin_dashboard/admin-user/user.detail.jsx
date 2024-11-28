// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index.js";
//import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import './user-detail.css'
import { useParams } from "react-router-dom";
import pfp from "../../../../assets/pfp.png"
const User_Detail = () =>{
  const navigate = useNavigate();
 
  const { id } = useParams(); // Extract the user ID from the URL
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading,setLoading] = useState(''); // Loading state
  const [error, setError] = useState("");
  const [userBooks, setUserBooks] = useState([]); // State to hold user's borrowed books

  useEffect(() => {
    const token = localStorage.getItem('Admintoken') || sessionStorage.getItem('Adminsessiontoken');
    
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchUserData = async () => {
      try {

        // Fetch user data
        const userResponse = await fetch(`http://localhost:8080/api/dashboard/user/${id}`, config);
        if (!userResponse.ok) {
          throw new Error(`User API request failed: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        
        setUserData(userData);
        
        // Fetch user's borrowed books data
        const booksResponse = await fetch(`http://localhost:8080/api/dashboard/${id}/books`, config);
        if (!booksResponse.ok) {
          throw new Error(`Books API request failed: ${booksResponse.status}`);
        }
        const booksData = await booksResponse.json();
        setUserBooks(booksData); // Set the fetched books data
        console.log(booksData)
      } catch (error) {
        console.error(error);
        alert("Error fetching user detail");
        setError("Failed to load user detail")
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [id],[navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`http://localhost:8080/api/admin/delete-user/${id}`, config);
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }
      alert("User deleted successfully!");
      navigate("/admin/user"); // Navigate back to the user list
    } catch (error) {
      console.error(error);
      alert("Failed to delete user. Please try again.");
    }
  };


  if (loading) {
    return (
      <Admin_DashboardLayout>
      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
    </Admin_DashboardLayout>
    );// Show loading state
  }

  if (!userData) {
    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }
  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba

    return <div className="loding">404 PAGE NOT FOUND{error}</div>;
  }
  return (
    <Admin_DashboardLayout>
      <main className="wrapper_user-detail">
      {/* <div className="header">
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
                <a href='#' className='active'>User detail</a>
              </li>
              </Link>
            </ul>
          </div>
          
        </div> */}
        <div className="u-s-d">
            <div className="us">
                <div className="us-img"><img src={pfp} alt="pfp"/></div>
                <div className="us-d">
                    <h3>Name: {userData.name}</h3>
                    <p>Enrollment Id: {userData.enrollmentId}</p>
                    <p>Contact: {userData.contact}</p>
                    <p>Department: {userData.department}</p>
                    
                    
                </div>
                <div className="us-btn">
                    <button className="us-update">Update</button>
                    <button className="us-delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>
      <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <i className="bx bx-receipt"></i>
              <h3>User Books Collection</h3>
              <i className="bx bx-filter"></i>
              <div className="form-input">
                <input type="search" placeholder="Search..."/>
                    <button className="search-btn" type="submit" ></button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>ISBN</th>
                </tr>
              </thead>
              <tbody>
              {userBooks.length > 0 ? (
                    userBooks.map((book) => (
                      <tr key={book.isbn}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{new Date(book.borrowedDate).toLocaleDateString()}</td>
                        <td>{book.isbn}</td>
                        <td>
                          <button>Returned</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No books borrowed.</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        
       
        
      </main>
    </Admin_DashboardLayout>
  );
}

export default User_Detail;
