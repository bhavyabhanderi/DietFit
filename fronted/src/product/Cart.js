import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import { cartitem } from '../Product';
import { final_cart_item } from '../Home';

const Cart = () => {
  const [cartvisible, showcart] = useState(false);
  const [buynow, setbuy] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    card: '',
    cvv: '',
  });
  
  const [s1,sets1]=useState([...cartitem, ...final_cart_item]);

  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://localhost:8000/api/get-csrf-token/', {
        method: 'GET',
        mode: 'cors',
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    getCsrfToken();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearcart = () => {
    s1.splice(0, s1.length);
    showcart(false);
  };

  const calculateTotalPrice = () => {
    return s1.reduce((total, item) => total + item.price * item.q1, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total_price = calculateTotalPrice();


    const dataToSend = {
      ...formData,
      total_price: total_price,
    };

    try {
      const response = await fetch('http://localhost:8000/buy/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        clearcart();
        setbuy(false);
      } else {
        alert(result.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <>
      <Nav />
      <div>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <button onClick={() => showcart(!cartvisible)} style={{ marginTop: '50px' }}>
            {cartvisible ? 'Hide Cart' : 'View Your Cart'}
          </button>
        </div>

        {cartvisible && (
          <div className="cart-section">
            <h2>Your Cart</h2>
            {s1.length > 0 ? (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s1.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name1}</td>
                        <td>₹ {item.price}</td>
                        <td>{item.q1}</td>
                        <td>
                          <img src={item.images} style={{ height: '70px' }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={clearcart} className="clear-cart-button">
                  Clear Cart
                </button>
                <button
                  style={{ marginLeft: '20px' }}
                  onClick={() => setbuy(!buynow)}
                >
                  Buy Now
                </button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}

        {buynow && (
          <div className="form-container-2">
            <h2 className="form-title">Buy Product</h2>
            <form className="buy-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your phone number"
                className="input"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Your address"
                className="input"
                value={formData.address}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Your pincode"
                className="input"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="card">Debit Card Number</label>
              <input
                type="text"
                id="card"
                name="card"
                placeholder="Your debit card number"
                className="input"
                value={formData.card}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="cvv">CVV Number</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="Your CVV number"
                className="input"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <footer className="footer" style={{ marginTop: '200px' }}>
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
    </>
  );
};

export default Cart;