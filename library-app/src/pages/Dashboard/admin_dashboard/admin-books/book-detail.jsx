// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import {  useLocation, Link ,useNavigate} from 'react-router-dom';
import axios from "axios";
import  bookimg from "../../../../assets/book1.webp";
import "./book.css";
import { bouncy } from "ldrs";

const Books_Detail = () =>{
  const location = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get('BookId');
  useEffect(() => {
    const token = localStorage.getItem('Admintoken')|| sessionStorage.getItem("Adminsessiontoken");
    setLoading(true);

    if(!token){
      alert("No token found, please log in again");
      navigate('/user/login/admin', {replace: true});
    }
      
    const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    const fetchBookDetails = async () => {
      // Extract the BookId from the query string

      if (bookId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/books/detail?BookId=${bookId}`,config); 
          setBook(response.data);
          console.log(response);
        } catch (error) {
          alert("Error fetching book detail");
        setError("Failed to load book detail")
        } finally{
        setTimeout(() => setLoading(false), 100);

        }
      }
    };

    fetchBookDetails();
  }, [location],[navigate]);
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
      <main className="wrapper_books-detail">

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
                <a href='#'>Book</a>
              </li>
              </Link>
              <h2>/</h2>
              <Link to="/admin/Dashboard/Administrator">
              <li>
                <a href='#' className='active'>Detail</a>
              </li>
              </Link>
            </ul>
          </div>
        </div>
      

      <div className="b-d-c">
            <div className="bd">
            <div className="bd-img">
              <img src={book ? book.coverImage : bookimg} alt="Book Cover"/>
            </div>
            <div className="bd-d">
              <h3>Title: {book?.title || 'Loading...'}</h3>
              <p>Author: {book?.author || 'Loading...'}</p>
              <p>ISBN: {book?.isbn || 'Loading...'}</p>
              <p>Department: {book?.tag || 'Loading...'}</p>
              <p>Publish date: {book?.publishedDate || 'Loading...'}</p>
              <div className="bd-des">
                <p>Description:</p>
                <span className="des">{book?.description || 'Loading...'}</span>
              </div>
            </div>
                <div className="bd-btn">
                    <button className="bd-update">Update</button>
                    <button className="bd-delete">Delete</button>
                    <Link to={`/admin/${bookId}/loan-history`}>
                    <button className="bd-loan-history">loan History</button>
                    </Link>
                </div>
            </div>
      
        </div>
        
       
      </main>
    </Admin_DashboardLayout>
  );
}

export default Books_Detail;
