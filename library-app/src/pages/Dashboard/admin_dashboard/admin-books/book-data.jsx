// src/components/Dashboard/Dashboard.js

import { Admin_DashboardLayout } from "../../../index";
//import { Link } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import  bookimg from "../../../../assets/book1.webp";
import "./book.css";
const Book_history = () =>{
  
  //test file
  return (
    <Admin_DashboardLayout>
      <main className="wrapper_books-data">
      <div className="b-d-c">
            <div className="bd">
                <div className="bd-img"><img src={bookimg} alt="pfp"/></div>
                <div className="bd-d">
                    <h3>Title:</h3>
                    <p>Author:</p>
                    <p>ISBN:</p>
                    <p>Department:</p>
                    <p>Editon:</p>
                    <div className="bd-des"><p>Description:</p>
                    <span className="des">THIS IS DESCRIPTION</span></div>
                </div>
                <div className="bd-btn">
                    <button className="bd-update">Update</button>
                    <button className="bd-delete">Delete</button>
                </div>
            </div>
      <div className="bottom-data">
          <div className="orders">
            <div className="header">
            
              <h3>Borrower history</h3>
              
            </div>
            <table>
              <thead>
                <tr>
                  <th>EnrollmentID</th>
                  <th>Name</th> 
                  <th>Department</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>21111798799</p>
                  </td>
                  <td>Davies</td>

                  <td>Cse</td>
                  <td>
                    <Link to="/admin/user/detail">
                    
                    <button>Detail</button>
                    </Link>
                  </td>
                </tr>

                
              </tbody>
              <thead>
                <tr>
                  <th>Date of Borrow</th>
                  <th>Date of Return</th> 
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>2/2/21</p>
                  </td>
                  <td>1/9/23</td>
                  
                </tr>

                
              </tbody>
            </table>
          </div>
        </div>
       
        </div>
        
       
      </main>
    </Admin_DashboardLayout>
  );
}

export default Book_history;
