import React from 'react';
import { Link } from 'react-router-dom';



const Admin_Catalog = () => {
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
          <Link to="/admin/Dashboard/Administrator">
          <li>
            <i className='bx bxs-user' ></i>
            <span className="info">
              <h3>
                Admin
              </h3>
              
            </span>
          </li>
          </Link>
          <Link to="/admin/books">
            <li>
              <i className='bx bx-book'></i>
              <span className="info">
                <h3>
                 Books
                </h3>
                
              </span>
            </li>
          </Link>
          <Link to="/admin/user">
            <li>
              <i className='bx bxs-user-detail' ></i>
              <span className="info">
                <h3>User</h3>
              </span>
            </li>
          </Link>
          <Link to="/admin/overdue/loan">
            <li>
              <i className='bx bxs-user-detail' ></i>
              <span className="info">
                <h3>Overdue Loan</h3>
              </span>
            </li>
          </Link>
        </ul>
    </div>
  )
}

export default Admin_Catalog

