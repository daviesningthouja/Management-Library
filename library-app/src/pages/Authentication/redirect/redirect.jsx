import React from 'react'
import './redirect.css'
import { Link } from 'react-router-dom'
const redirect = () => {
  return (
    <div className='redirect-wrapper'>
    
      <div className='redirect-box'>
        <Link to="/user/login/admin">
        <div className='redirect-admin'>
        <div className='a-icon'><i className='bx bx-user' ></i></div>
        <h3>Login as Admin</h3>
        </div>
        </Link>

        <Link to="/user/login/student">
        <div className='redirect-student'>
            <div className='s-icon'><i className='bx bxs-user-badge'></i></div>
            <h3>Login as Student</h3>
        </div>
        </Link>
      </div>
    
    </div>
  )
}

export default redirect
