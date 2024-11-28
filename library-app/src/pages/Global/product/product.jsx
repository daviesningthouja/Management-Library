import React from 'react'
import {MainLayout} from '../../index.js';
import './product.css'
import mockup1 from '../../../assets/192(1).png'
const Product = () => {
  return (
<MainLayout>
    <div className='product-wrapper'>
      <section className='product-hero-section'>
        <h1>Our Product</h1>
        <div className='product-hero'>
            <img src={mockup1} alt="" />
            <div className='product-context'>
            <p>Our state-of-the-art Library Management System is designed to simplify and enhance every aspect of library operations. From cataloging books to managing users and tracking books, our product offers a complete solution tailored to meet the needs of modern libraries.</p>
            </div>
        </div>
      </section>
     
      <section className='why-section'>
        <h1>Why Choose Our Library Management System?</h1>
        <div className='why-box'>
            <div className='why-context'>
                
                <i className='bx bx-customize'></i>
                <h2>Easy to Use</h2>
                <p> With an intuitive interface and user-friendly design, our system requires minimal training and support.</p>
            </div>
            <div className='why-context'>
                <i className='bx bxs-color' ></i>
                <h2>Customizable</h2>
                <p>Tailor the system to your library’s specific needs with customizable features and settings.</p>
            </div>
            <div className='why-context'>
                <i className='bx bx-support'></i>
                <h2>Reliable Support</h2>
                <p> Our dedicated support team is always available to assist you with any questions or issues you may have.</p>
            </div>
        </div>
      </section>
    </div>
</MainLayout>
  )
}

export default Product
