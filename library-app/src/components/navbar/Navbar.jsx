import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link,useLocation} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from '../../assets/logo.png'
import Mitlogo from '../../assets/manipur-institute-of-technology-mit-logo-26-06-2017.png'
import MUlogo from '../../assets/Manipur_University_Logo.png'

const Navbar = () => {
  const location = useLocation();
  const [activeIndex, setactiveIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname){
      case "/Home":
        setactiveIndex(0);
        break;
      case "/About":
        setactiveIndex(1);
        break;
      case "/Product":
        setactiveIndex(2);
        break;
      case "/Service":
        setactiveIndex(3);
        break;
      
      default:
        setactiveIndex(0);
      
    }
  })
    const handleClick = (index) => {
      setactiveIndex(index)
    }
  return (
    <nav className='navbar'>
      <a href='#'>
        <div className='navbar_logo'>
          
            <img className='navbar_logo-img' src={Mitlogo} alt="Logo" />
            
          
        </div>
        </a>
        <nav className='navbar_link'>
            <ul className='navbar_link-container wrap'>
              <li className= {activeIndex === 0 ? 'gradient-text b-box' : 'gradient-text'} onClick={() => handleClick(0)}><Link to ='/Home' smooth duration={500}>Home</Link></li>
              <li className={activeIndex === 1 ? 'gradient-text b-box' : 'gradient-text'} onClick={() => handleClick(1)}><Link to ='/About' smooth duration={500}>About</Link></li>
              <li className={activeIndex === 2 ? 'gradient-text b-box' : 'gradient-text'} onClick={() => handleClick(2)}><Link to ='/Product'>Product</Link></li>
              <li className={activeIndex === 3 ? 'gradient-text b-box' : 'gradient-text'} onClick={() => handleClick(3)}><Link to ='/Service'>Service</Link></li>
            </ul>
        </nav>
       
          <div className='navbar_login-btn-container'>
            
          <div className="login-btn-container">
              <Link to= "/user/login/">
                <span className="maskLogin">Login</span>
                <button id='work' type="Submit" name="Hover">Login</button>
              </Link>
              </div>
            
            {/* <Link to="/user/registration" ><button className='navbar_sign-btn'>Sign up</button></Link> */}
          </div>
        
    </nav>
  )
};

export default Navbar
