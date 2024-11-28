import './home.css'
import HeroSectionImg from '../../../assets/b1.png';
import img1 from '../../../assets/landingH1.jpg';
// import Mitlogo from '../../../assets/manipur-institute-of-technology-mit-logo-26-06-2017.png';
// import MUlogo from '../../../assets/Manipur_University_Logo.png';
import pfp from '../../../assets/pfp.png'
import {MainLayout} from '../../index.js';
import {Product, Service} from '../../../components';
const Home = () =>{


  return (
    <MainLayout>
      
          
          {/* <h1 className='gradient_text'>Welcome to Your Library Portal</h1>
          <p>Search, Borrow, and Manage Your Books with Ease</p>
        
          <div className='header_picture'>
            <img src={HeroSectionImg}/>
          </div> */}
         


         <div className="home_wrapper">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1 className='gradient_text'>Welcome to Your Library Portal</h1>
              <p>
              Search, Borrow, and Manage Your Books with Ease
              </p>
              <div className='landing-search'>
              <input type="search" placeholder="Search 1000+ books & research articles" />
              <button>Search</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={HeroSectionImg} alt="Hero" />
            </div>
          </section>

          {/* Content Sections */}
          <section className="content-section">
            <div className="card">
            <div className="card_img">
            <img src={img1} alt="Rent Books" className="card-img" />
            </div>
            <div className='card-txt'>
              <h2>Rent your favourite book from our library</h2>
              <p>Buying a book is not necessary for reading a book. You can rent a book for minimal costs.</p>
            </div>
            </div>
            <div className="card">
              <div className='card-txt2'>
              <h2>Create your own bookshelf which our librarian can see</h2>
              <p>Community members can see and follow your bookshelf as well.</p>
              </div>
              <div className="card_img">
              <img src={img1} alt="Rent Books" className="card-img" />
              </div>
            </div>
          </section>
        </div>
        <Product/>
        <Service/>

          {/* Testimonials Section */}
          <section className="testimonials">
            <h2>What our community has to say?</h2>
            <div className="testimonial-cards">
              <div className="testimonial-card">
                <div className='user-detail-card'>
                  <img src={pfp} alt='user profile'/>
                  <div className='username-card'>
                    <h1>Username</h1>
                    <p>Prof at MIT</p>
                  </div>
                </div>
                <div  className='commend'>
                <p  >I was amazed at how quickly our staff adapted to the new system. The user-friendly design and excellent customer support made the transition seamless. Our library members are happier than ever.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className='user-detail-card'>
                  <img src={pfp} alt='user profile'/>
                  <div className='username-card'>
                    <h1>Username</h1>
                    <p>Prof at MIT</p>
                  </div>
                </div>
                <div  className='commend'>
                <p  >I was amazed at how quickly our staff adapted to the new system. The user-friendly design and excellent customer support made the transition seamless. Our library members are happier than ever.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className='user-detail-card'>
                  <img src={pfp} alt='user profile'/>
                  <div className='username-card'>
                    <h1>Username</h1>
                    <p>Prof at MIT</p>
                  </div>
                </div>
                <div  className='commend'>
                <p  >I was amazed at how quickly our staff adapted to the new system. The user-friendly design and excellent customer support made the transition seamless. Our library members are happier than ever.</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className='user-detail-card'>
                  <img src={pfp} alt='user profile'/>
                  <div className='username-card'>
                    <h1>Username</h1>
                    <p>Prof at MIT</p>
                  </div>
                </div>
                <div  className='commend'>
                <p  >I was amazed at how quickly our staff adapted to the new system. The user-friendly design and excellent customer support made the transition seamless. Our library members are happier than ever.</p>
                </div>
              </div>
            </div>
            
          </section>

          {/* CTA Section */}
          <section className="cta">
            <div className='guest-login'>
              <h2>Sign In As Guest</h2>
              <button>Guest</button>
            </div>
          </section>
  </MainLayout>
  
    
  )
}

export default Home
