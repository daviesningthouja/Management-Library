// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './addbook.css'
import axios from "axios";
import { bouncy } from "ldrs";
const Add_book = () =>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  
  

  

  const [formData, setFormData] = useState({
      title: "",
      author: "",
      isbn: "",
      tag: "",
      description: "",
      quantity: 1,
      publishDate: "",
      
    });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Admintoken") || sessionStorage.getItem("Adminsessiontoken");

    if (!token) {
        setError("No token found, please log in again");
        alert("No token found, please log in again");
        navigate('/user/login/admin', { replace: true });
    } else {
        setLoading(false);
    }
  }, [navigate]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
      
        // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    
    try {
        const token = localStorage.getItem('Admintoken')|| sessionStorage.getItem("Adminsessiontoken");
        if(!token){
          throw new Error ("No token found, please log in again");
    
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };
    
        const response = await axios.post("http://localhost:8080/api/admin/add-book", formData, config);   
      console.log(response.data);  // Success response
      alert("Book added successfully!");
    } catch (error) {
        console.error("Error adding book:", error.response?.data || error.message);
        alert("Failed to add book. Please try again.");
        //setError(error, "Fail to add the book")
    }finally{
      setTimeout(() => setLoading(false))
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
      <main className="wrapper_add-book">
        <div className="regis-header">
        <div className="arrow"><Link to='/admin/dashboard/administrator'>
            <i className='bx bx-arrow-back'></i>
            </Link></div>
            <div className="detail">
                <h3>

                Entry Books Detail
                </h3>
            </div>
        </div>
        <div className="regis-book-form">

        <form onSubmit={handleSubmit}>
            <div className="regis-img">
                <label>Image</label>
                <div>
                    <img className="img-d" src={formData.image} alt="" />
                </div>
                <input  className='pos-btn' type="file" name="image" onChange={handleChange}/>
            </div>
            <div className="regis-tittle">
                <label htmlFor="">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />            </div>
            <div className='regis-author'>
                <label htmlFor="">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} />            </div>
            <div className="regis-isbn">
                <label>ISBN</label>
                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />            </div>
            <div className="regis-department">
            <label>Department</label>
                <div className="radio-box">
                    
               
                <input type="radio" name="tag" value="Computer Science" onChange={handleChange} /> Computer Science
                <input type="radio" name="tag" value="Civil" onChange={handleChange} /> Civil
                <input type="radio" name="tag" value="Mechanical" onChange={handleChange} /> Mechanical
                <input type="radio" name="tag" value="Electronic & Communication" onChange={handleChange} /> Electronic & Communication
                <input type="radio" name="tag" value="Electrical" onChange={handleChange} /> Electrical
                <input type="radio" name="tag" value="Basic Science & Humanities" onChange={handleChange} /> Basic Science & Humanities
          
                    
                </div >
            </div>
            <div className="regis-desc">
                <label htmlFor="">Description</label>
                <textarea id="description" name="book-des" rows="4" cols="50"/>
            </div>
            <div className="regis-Q">
                <label htmlFor="">Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />            </div>
            <div className="regis-Pdate">
                <label htmlFor="">Publish date</label>
                <input type="date" name="publishDate" value={formData.publishDate} onChange={handleChange} />            </div>
            
            <div className="sub-btn">
                 <button type="submit">Save</button>
            </div>

        </form>
        </div>
       
      </main>
    </Admin_DashboardLayout>
  );
}

export default Add_book;
