import React from 'react';
import { Link } from 'react-router-dom';
//test cat

const Admin_Cat= () => {
  return ( 
    <div>
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
                <a href='#' className='active'>Admin</a>
              </li>
              </Link>
            </ul>
          </div>
          
        </div>

        <div className="bottom-data">
          <div className="orders">
            <div className="header">
              <i className="bx bx-receipt"></i>
              <h3>Admin List</h3>
              <i className="bx bx-filter"></i>
              <div className="form-input">
                <input type="search" placeholder="Search..."/>
                    <button className="search-btn" type="submit" ></button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="images/profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="images/profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="images/profile-1.jpg" />
                    <p>John Doe</p>
                  </td>
                  <td>14-08-2023</td>
                  <td>
                    <span className="status process">Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
    </div>
  )
}

export default Admin_Cat

