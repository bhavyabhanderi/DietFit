import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Assuming you will add styles here
import './Home.css';
import i4 from './Image/eggsalad.jpg'
import i5 from './Image/fruitbag.jpg'
import i6 from './Image/lassaniya.jpg'
import i7 from './Image/nutspake.jpg'
import one from './Image/a1234.jpg'
import two from './Image/st1234.jpg'
import s1 from './Image/s1.png'
import s2 from './Image/s2.png'
import s3 from './Image/s3.png'
import s4 from './Image/s4.png'
import a1 from './Image/dietmeal2.png'
import a2 from './Image/dietmeal3.png'
import a3 from './Image/dietmeal4.png'
import a4 from './Image/dietmeal5.png'
import diet1 from './Image/dietmeal1.png'
import './Product.css';
import Nav from './Nav'
import One from './One';
import Vendor from './Doctor';




const products = [
  { id: 1, name: 'EGG SALAD', price: '250', quantity: '1 Plate', url: i4, q1: 1 },
  { id: 2, name: 'FRUIT BAG', price: '150', quantity: '1 plate', url: i5, q1: 1 },
  { id: 3, name: 'LASSANIYA', price: '320', quantity: '1 plate', url: i6, q1: 1 },
  { id: 4, name: 'NUTS PAKE', price: '270', quantity: '1 plate', url: i7, q1: 1 },
];


const services = [
  { imgSrc: s1, title: 'Free Shipping', description: 'Free shipping on all our products' },
  { imgSrc: s2, title: '24x7 Support', description: 'Contact us 24 hours a day, 7 days a week' },
  { imgSrc: s3, title: '30 Days Return', description: 'We will return your money if you did not satisfied with your result' },
  { imgSrc: s4, title: 'Payment Secure', description: 'Get first call free' },
];

const img = [
  { id: 1, src: a1, alt: 'Image 1', title: 'Marketing Guide: 5 Steps to Success.', date: 'June 30, 2024' },
  { id: 2, src: a2, alt: 'Image 2', title: 'Best way to solve business deal issue.', date: 'May 10, 2023' },
  { id: 3, src: a3, alt: 'Image 3', title: 'Business ideas to grow your business.', date: 'Jan 10, 2022' },
  { id: 4, src: a4, alt: 'Image 4', title: '31 customer stats you should know in 2020.', date: 'Feb 12, 2022' },

];

var final_cart_item = []

const Home = () => {


  const navigate = useNavigate()


  const [productList2, setProductList2] = useState(products);

  const addtocart = (name1, price, quantity, image, q1) => {
    var c = parseInt(price)
    c = c * q1
    price = c.toString()
    const v1 = {
      name1: name1,
      price: price,
      quantity: quantity,
      images: image,
      q1: q1
    };
    final_cart_item.push(v1);
  };



  const handleIncrease1 = (id) => {
    setProductList2(productList2.map(product =>
      product.id === id
        ? { ...product, q1: product.q1 + 1 }
        : product
    ));
  };

  const handleDecrease1 = (id) => {
    setProductList2(productList2.map(product =>
      product.id === id && product.q1 > 1
        ? { ...product, q1: product.q1 - 1 }
        : product
    ));
  };

  return (
    <>
      <Nav />

      <div className='container1'>
        <div className="categories-section">
          <One />
          <div className="content1">
            <div className="image-content1">
              <img src={diet1} alt="Woman with grocery cart" />
              <div className="discount-badge">50% Off</div>
            </div>
            <div className="text-content">
              <h1>
                Explore <span className="highlighted">Diet plan</span>
              </h1>
            </div>
          </div>
        </div>


        <div className="categories">
          <div className="category-card">
            <div className="icon">
              🍒
            </div>
            <h3><a href='#' className='text color'>Fruits</a></h3>

          </div>
          <div className="category-card">
            <div className="icon">
              🥤
            </div>
            <h3><a href='#' className='text color'>Protien Shake</a></h3>

          </div>
          <div className="category-card">
            <div className="icon">
              🧁
            </div>
            <h3><a href='#' className='text color'>Backed good</a></h3>
          </div>
          <div className="category-card">
            <div className="icon">
              🥕
            </div>
            <h3><a href='#' className='text color'>Vegetables</a></h3>

          </div>
        </div>


        <div className='App'>
          <div className="product-home">
            {productList2.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.url} alt={product.name} />
                <h5>{product.name}</h5>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <div className="button-container">
                  <button className="quantity-combined-btn">
                    <span className="decrease" onClick={() => handleDecrease1(product.id)}>
                      –
                    </span>
                    <span className="quantity-value">{product.q1}</span>
                    <span className="increase" onClick={() => handleIncrease1(product.id)}>
                      +
                    </span>
                  </button>
                </div>
                <button onClick={() => {
                  addtocart(product.name, product.price, product.quantity, product.url, product.q1);
                  alert('Your ' + product.name + ' is added to cart')
                }}>
                  Add to Cart
                </button>

              </div>
            ))}
          </div>
        </div>


        <div className="cards-container" style={{ marginTop: '40px' }}>
          <div className="card">
            <img
              src={one} // Replace with your image URL
              alt="Tasty & Healthy Food"
              className="card-image"
            />
            <div className="card-content">
              <h3>Tasty & Healthy Food</h3>
              <p>The flavour of something special</p>
              <button className="shop-button" onClick={() => { navigate('/product') }}>Shop Now</button>
            </div>
          </div>

          <div className="card">
            <img
              src={two} // Replace with your image URL
              alt="Fresh Fruits & Vegetables"
              className="card-image"
            />
            <div className="card-content">
              <h3>Fresh Fruits</h3>
              <p>A healthy meal for everyone</p>
              <button className="shop-button" onClick={() => { navigate('/product') }}>Shop Now</button>
            </div>
          </div>
        </div>


        <div className="service-container" style={{ marginTop: '40px' }}>
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <img src={service.imgSrc} alt={service.title} className="service-image" />
              <div className="title">{service.title}</div>
              <div className="description">{service.description}</div>
            </div>
          ))}
        </div>

        <Vendor />


        <div className="image-grid" style={{ marginTop: '40px' }}>
          {img.map((image) => (
            <div key={image.id} className="image-wrapper">
              <div className="text-overlay">
                <p>{image.date}</p>
                <h3>{image.title}</h3>
              </div>
              <img src={image.src} alt={image.alt} className="hover-image" />
            </div>
          ))}
        </div>


        <footer className="footer">
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
                <button type="submit" style={{ width: '100px' }}>Send</button>
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
      </div>
    </>);
};

export { final_cart_item }
export default Home;