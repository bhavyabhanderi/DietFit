import React from 'react';
import './About.css'; // Updated CSS file
import about from '../Image/about.jpg'
import Nav from '../Nav';
const About = () => {
  return (
    <>
    <Nav/>
    <div className="info-wrapper">
      <div className="info-text-section">
        <h2 className="info-title">About The Carrot</h2>
        <p className="info-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, recusandae necessitatibus
          quasi incidunt alias adipisci pariatur earum iure beatae assumenda rerum quod. Tempora
          magni autem a voluptatibus neque.
        </p>
        <p className="info-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae rerum cum accusamus magni
          consequuntur architecto, ipsum deleniti expedita doloribus suscipit voluptatum eius perferendis
          amet!.
        </p>
        <p className="info-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, maxime amet architecto
          est exercitationem optio ea maiores corporis beatae, dolores doloribus libero nesciunt qui illum?
          Voluptates deserunt adipisci voluptatem magni sunt sed blanditiis quod aspernatur! Iusto?
        </p>
      </div>
      <div className="info-image-section">
        <img src={about} alt="Vegetables" className="info-image" />
      </div>
      <div className="info-stats-section">
        <div className="info-stat-block">
          <h3 className="info-stat-number">1.2k</h3>
          <p className="info-stat-label">Vendors</p>
        </div>
        <div className="info-stat-block">
          <h3 className="info-stat-number">410k</h3>
          <p className="info-stat-label">Customers</p>
        </div>
        <div className="info-stat-block">
          <h3 className="info-stat-number">34k</h3>
          <p className="info-stat-label">Products</p>
        </div>
      </div>
    </div>




    <footer className="footer" >
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Heaven diet doesn't over lesser days appear creeping seasons so behold bearing days open.
          </p>
          <div className="logo">
            <h2>Diet Fit</h2>
            <p>HOME SOLUTION</p>
          </div>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <p>Savvy Starata,Ahmedabad,Gujarat</p>
          <p>Phone: +8880 44338899</p>
          <p>Email: dietfit@gmail.com</p>
        </div>

        <div className="footer-column">
          <h3>Important Link</h3>
          <ul>
            <li><a href="#whmcs">Sign in</a></li>
            <li><a href="#domain">Search Domain</a></li>
            <li><a href="#account">My Account</a></li>
            <li><a href="#cart">View Cart</a></li>
            <li><a href="#shop">Our Shop</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>
            Heaven diet doesn't over lesser in days. Appear creeping seasons deve behold bearing days open.
          </p>
          <form>
            <input type="email" placeholder="Email Address" />
            <button type="submit" style={{width:'100px'}}>Send</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright ©2022 All rights reserved </p>
        <div className="social-icons">
          <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#twitter"><i className="fab fa-twitter"></i></a>
          <a href="#globe"><i className="fas fa-globe"></i></a>
          <a href="#behance"><i className="fab fa-behance"></i></a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default About;
