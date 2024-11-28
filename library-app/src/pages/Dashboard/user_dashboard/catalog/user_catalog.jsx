import React from 'react';
import { Link } from 'react-router-dom';
import './catalog.css';


const User_Catalog = () => {
  return ( 
    <div>
      <div className="header">
          <div className="left">
            <h1>Dashboard</h1>
            <ul className="breadcrumb">
              <Link to="/admin/Dashboard">
              <li>
                <a className="active">Catalog</a>
              </li>
              </Link>
            </ul>
          </div>
          
        </div>

        <ul className="insights">
          <Link to="/user/profile">
          <li>
            
            <i className='bx bxs-user'></i>
            <span className="info">
              <h3>
                Profile
              </h3>
              
            </span>
          </li>
          </Link>
          <Link to="#">
            <li>
            <i className='bx bx-collection'></i>
              <span className="info">
                <h3>
                  Collections
                </h3>
                
              </span>
            </li>
          </Link>
          <Link to="#">
            <li>
            <i className='bx bxs-book'></i>
              <span className="info">
                <h3>Library</h3>
              </span>
            </li>
          </Link>
        </ul>
    </div>
  )
}

export default User_Catalog
