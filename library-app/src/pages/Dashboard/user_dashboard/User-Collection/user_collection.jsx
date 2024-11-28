import { User_DashboardLayout } from "../../../index.js";
import { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";

import "./collection.css";
import axios from "axios";
import { bouncy } from 'ldrs';
const User_Collection = () => {
  //const [user, setUser] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [userBooks, setUserBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('sessiontoken')

    
    // Log the token to check if it exists
    //console.log("Token: ", token);
   
    if (!token) {
      alert("No token found, please log in again");
      navigate('/user/login/student', { replace: true });
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const fetchUserData = async () => {
      try {
        
        
      
        // console.log(user)
        // Fetch user borrowed books collection
        const collectionResponse = await axios.get('http://localhost:8080/api/Dashboard/user/collection', config);
        setUserBooks(collectionResponse.data);
        console.log(collectionResponse.data)
        
        //setTimeout(() => setLoading(false), 1000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to load user books collection');
        setError('Fail to load userbooks collection ',error);
        
      }finally{
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchUserData();
  }, [navigate]);
  bouncy.register()
  if (loading) {
    return  <User_DashboardLayout>
  
      <div className="loding">
    
    <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
  
  
  </User_DashboardLayout>
  }

  if (error) {
    //error page semda yroi route onna chngkpa mtm da utpa ynba
    return <div className="loding">404 PAGE NOT FOUND</div>;

    // return alert('no token found. please log in again')  
  //   <div className="loding">
  //  404 PAGE NOT FOUND
  //       </div>;
  }
return (
  <User_DashboardLayout>
  <main className="collection_body">
  <div className="header">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <Link to="/admin/Dashboard">
                  <li>
                    <a className="active">Collection</a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
    <div className="wrapper_collection">
      <h2>My Collection</h2>
      {/* <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Book Id</div>
          <div className="col col-2">Book Tittle</div>
          <div className="col col-3">Burrowed date</div>
          <div className="col col-4">Author</div>
        </li>
        {userBooks.map((book, index) => (
        <li className="table-row" key={index}>
          <div className="col col-1" data-label="Job Id"> {book.isbn}</div>
          <div className="col col-2" data-label="Customer Name"> {book.title}</div>
          <div className="col col-3" data-label="Amount"> {book.borrowedDate}</div>
          <div className="col col-4" data-label="Payment Status"> {book.author}</div>
        </li>
                ))}
                
      </ul> */}
      <div className="collection-book">
      {userBooks.map((book, index) => (
              <Link
                to={`/user/collection/book?id=${book.bookId}`} // Assuming each book has a unique ID
                key={index}
                className="book-item"
              >
            {/* Placeholder image or book cover */}
            <div className="book-cover">Book</div>
            <div className="book-details">


            <h3>{book.title}</h3>
            <p>{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </main>
</User_DashboardLayout>
  )
}

export default User_Collection
