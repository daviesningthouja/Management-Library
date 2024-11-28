import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { bouncy } from 'ldrs';
import { User_DashboardLayout } from "../../../index.js";

const UserBook_detail = () => {
  const location = useLocation();
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
      const queryParams = new URLSearchParams(window.location.search);
      const bookId = queryParams.get("BookId");
      try {
        if(bookId){
          try{

            const response = await axios.get(`http://localhost:8080/api/books/detail?BookId=${bookId}`,config); 

            
            setBook(response.data);
            setLoading(false);
          
          } catch (err) {
            console.error('Error fetching book data:', err);
            alert('error fetching book details');
          }
        }
      } catch (error) {
        setError('Failed to load book details');
          console.error('Error fetching book details',error)
      }finally{
        setTimeout(() => setLoading(false), 500);

      }
    }
  
    fetchBookDetails();
  }, [location] , [navigate]);
  
  bouncy.register();
  console.log(book)
  if (loading) {
    return <User_DashboardLayout>
      <main className="wrapper_profile">
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

export default UserBook_detail
