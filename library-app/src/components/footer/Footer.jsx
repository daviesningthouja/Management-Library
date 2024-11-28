import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='link-wrapper'>
      <ul>
        <li>Careers</li>
        <li>About</li>
        <li>Resources</li>
        <li>Help</li>
        <li>FAQs</li>
      </ul>
      </div>
      <div className='social-wrapper'>
        <i className='bx bxl-facebook'></i>
        <i className='bx bxl-instagram' ></i>
        <i className='bx bxl-discord-alt'></i>
      </div>
      <div className='copyright-txt'>
        <p>
        Copyright @ 2024 [Nigga.INC]. All rights reserved. Unauthorized reproduction or distribution of this software or any of its components is strictly prohibited.
        </p>
      </div>
    </div>
  )
}

export default Footer
