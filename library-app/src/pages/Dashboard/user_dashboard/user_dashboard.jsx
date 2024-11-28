// src/components/Dashboard/Dashboard.js

import { User_DashboardLayout } from "../../index.js";
import { Link, useNavigate } from "react-router-dom";
import {User_Catalog} from "../index.js";
import { useState, useEffect } from "react";

import './dashboard.css';
import { bouncy } from "ldrs";

// import ChipIcon from "./component/icons/Chip-Icon.jsx";
const User_Dashboard = () =>{
  const [staticSections] = useState([
    {
      id: 1,
      title: "Computer Science",
      //books: 256,
      icon: <i className='bx bx-chip'></i>,
      color:  "hsla(341, 100%, 85%, 1)",
    },
    {
      id: 2,

      title: "Civil",
     // books: 536,
      icon: <i className='bx bx-hard-hat' ></i>,
      color: "hsla(274, 100%, 59%, 1)",
    },
    {
      id: 3,
      title: "Electronic & Communication",
      //books: 783,
      icon: <i className='bx bx-broadcast'></i>,
      color: "hsla(46, 100%, 67%, 1)",

    },
    {
      id: 4,
      title: "Basic Science & Humanities",
      //books: 689,
      icon: <i className='bx bx-universal-access'></i>,
      color: "hsla(162, 100%, 50%, 1)",
    },
    {
      id: 5,
      title: "Mechanical",
      //books: 689,
      icon: <i className='bx bxs-wrench'></i>,
      color: "hsla(194, 100%, 50%, 1)",
    },
    {
      id: 6,
      title: "Electrical",
      //books: 689,
      icon:<i className='bx bxs-bolt'></i>,
      color: "hsla(249, 100%, 40%, 1)",
    },
  ]);
  const navigate = useNavigate();
  const [sections, setSections] = useState([]); // Will store the merged sections (static + fetched data)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [hoveredSections, setHoveredSections] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Adjust based on how many sections you want to display at once
// Fetch tags with book counts from the backend


useEffect(() => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("sessiontoken");
  
  if (!token) {
    alert("No token found, please log in again");
    navigate('/user/login/student', { replace: true });
    //throw new Error("No token found, please log in again");
  }
  const fetchTags = async () => {
    setLoading(true);
    try {

      const response = await fetch("http://localhost:8080/api/books/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
   
    
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
        const fetchedData = await response.json();
      console.log(fetchedData);
      // Map the fetched data to merge with static sections (icons and colors)
      const mergedSections = staticSections.map((section) => {
        const matchedTag = fetchedData.find((tag) => tag.title === section.title);
        return {
          ...section,
          books: matchedTag ? matchedTag.books : 0, // If no matching tag, set books to 0
        };
      });
      console.log(mergedSections);
      setSections(mergedSections); // Update the sections state with merged data
      
    } catch (error) {
      setError(error.message);
   
    }finally{
      setTimeout(() => setLoading(false), 500); 

    }
  };

  fetchTags();
}, [navigate]); // Empty dependency array ensures it runs once on component mount

const handleNext = () => {
  if (currentIndex + itemsPerPage < sections.length) {
    setCurrentIndex(currentIndex + itemsPerPage);
  }
};

const handlePrevious = () => {
  if (currentIndex - itemsPerPage >= 0) {
    setCurrentIndex(currentIndex - itemsPerPage);
  }
};
bouncy.register();
if (loading) {
  return <User_DashboardLayout>

      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>

</User_DashboardLayout>
}

if (error) {
  return <User_DashboardLayout>
  <main className="wrapper_dashboard">
    <User_Catalog/>
    
    <h2 className="h2">Department</h2>
      <div className="department-section">
        <button className="previous" onClick={handlePrevious}>
          &#10094;
        </button>
        <div className="popular-sections">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`section ${hoveredSections === index ? "active hovered" : ""}`}
            style={{ backgroundColor: section.color }} // Use color from static sections
            onMouseEnter={() => setHoveredSections(index)} // Set hovered state
            onMouseLeave={() => setHoveredSections(null)}
          >
            <div className={`icon`}>{section.icon}</div>
            <div className="departments">
              <div className="department-name">
                <h2>{section.title}</h2>
                <p>{section.books} Books</p>
              </div>
              <div className="category-btn">
                <Link to={`/user/library?tag=${section.title}`}>
                  <button>&gt;</button>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
  </main>
</User_DashboardLayout>
}


  return (
    <User_DashboardLayout>
      <main className="wrapper_dashboard">
        <User_Catalog/>
        
        <h2 className="h2">Department</h2>
          <div className="department-section">
            <button className="previous" onClick={handlePrevious}>
              &#10094;
            </button>
            <div className="popular-sections">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`section ${hoveredSections === index ? "active hovered" : ""}`}
                style={{ backgroundColor: section.color }} // Use color from static sections
                onMouseEnter={() => setHoveredSections(index)} // Set hovered state
                onMouseLeave={() => setHoveredSections(null)}
              >
                <div className={`icon`}>{section.icon}</div>
                <div className="departments">
                  <div className="department-name">
                    <h2>{section.title}</h2>
                    <p>{section.books} Books</p>
                  </div>
                  <div className="category-btn">
                    <Link to={`/user/library?tag=${section.title}`}>
                      <button>&gt;</button>
                    </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="next" onClick={handleNext}>
              &#10095;
            </button>
          </div>
      </main>
    </User_DashboardLayout>
  );
}

export default User_Dashboard;
