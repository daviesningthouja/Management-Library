import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './book_detail.css';
import { bouncy } from 'ldrs';
import { User_DashboardLayout } from "../../../index.js";
const Borrowed_Bookdetail = () => {
  
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  //const { id } = useParams(); // Extract book ID from URL
  const [book, setBook] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('sessiontoken');
  
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/student', { replace: true });
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchBookDetails = async () => {
      try {
        //console.log(`Requesting: http://localhost:8080/api/dashboard/user/collection/book/${id}`);

        // Fetch book details using the new endpoint
        //const queryParams = new URLSearchParams(window.location.search);
        // const BookID = queryParams.get("BookId");
        // console.log(BookID)
        // console.log(id)
        // if(!BookID){
        const response = await axios.get(`http://localhost:8080/api/dashboard/user/collection/book/${id}`, config);
  
        setBook(response.data);
      
      // }else{
      //   const response = await axios.get(`http://localhost:8080/api/books/detail?BookId=${BookId}`, config);
      //   console.log(BookID)
      //   setBook(response.data);
      //   setLoading(false);
      // }

      } catch (err) {
        console.error('Error fetching book data:', err);
        alert('Failed to load book details')
        setError('Failed to load book details',error);
      }finally{
        setTimeout(() => setLoading(false), 1000);

      }
    };
  
    fetchBookDetails();
  }, [id],[navigate]);
  
  bouncy.register();
  console.log(book)
  if (loading) {
    return <User_DashboardLayout><main className="wrapper_profile">
    <div className="loding">
      
        
<l-bouncy
  size="45"
  speed="1.75" 
  color="black" 
></l-bouncy>
          
      
    </div>
    </main>
    </User_DashboardLayout>;
  }

  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba
    
    return  <div className="loding">
      
        
   404 PAGE NOT FOUND
              
          
        </div>;
  }
  return (
    <User_DashboardLayout>
    <div className='wrapper_Book-detail'>
      
         
            <div className="arrow-header">
            <Link to='/user/library'>
            <i className='bx bx-arrow-back'></i>
            </Link>
          </div> 
          <div className='book-detail-wrapper'>
            <div className='book-img'>
              <img className=''></img>
            </div>
            <div className='book-detail'>
              <h1 className='book_title'>{book.title}</h1>
              <p className='book-d'>Author: <span className='author-name'> {book.author}</span></p>
              <p className='book-d'>ISBN: <span>{book.isbn}</span></p>
              <p className='book-d'>Department: <span>Cse</span></p>
        
              <div className='rental-btn'>
                <button className='borrowed-btn active-B'>Borrowed</button>
                <button className='return-btn'>Return</button>
              </div>
              <div className='description'>

              <p className='book-d'>Description:</p>
              <p className='book-des'>this is the description</p>
              </div>
            </div>
          </div>
      
    </div>
    </User_DashboardLayout>
  )
}

export default Borrowed_Bookdetail
