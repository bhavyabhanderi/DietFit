import React, { useState, useEffect } from 'react';
import './Product.css';
import i4 from './Image/protin4.jpg'
import i5 from './Image/protinbar1.jpg'
import i6 from './Image/protinbar2.jpg'
import i7 from './Image/protinbar3.png'
import p1 from './Image/protin1.webp'
import p2 from './Image/protin2.webp'
import p3 from './Image/protin3.webp'
import p4 from './Image/protin4.webp'
import p5 from './Image/oats.jpg'
import p6 from './Image/egg.jpg'
import p7 from './Image/beaf.jpg'
import p8 from './Image/sausage.jpg'
import p9 from './Image/p9.jpg'
import p10 from './Image/p10.jpg'
import f1 from './Image/f1.jpg'
import f2 from './Image/f2.jpg'
import f3 from './Image/f3.jpg'
import f4 from './Image/f4.jpg'
import veg1 from './Image/veg1.jpg'
import veg2 from './Image/veg2.jpg'
import kivi from './Image/kivi.jpg'
import apple from './Image/apple.jpg'
import carrot from './Image/carrot.jpg'
import graps from './Image/graps.jpg'
import pc1 from './Image/nutrition.png'
import pc2 from './Image/healthyfood2.png'
import pc3 from './Image/dietplan.png'
import meal1 from './Image/avocadosalad.jpg'
import meal2 from './Image/momos.jpg'
import meal3 from './Image/chickensalad.jpg'
import meal4 from './Image/potatosalad.jpg'
import meal5 from './Image/pasta.jpg'
import meal6 from './Image/watermelonsalad.jpg'

import Nav from './Nav';
const p = [
  { id: 1, name: 'Max Protein Peanut Bar', price: '80', quantity: '1 Pack', image: i5, q1: 1 },
  { id: 2, name: 'Naturezen Protein Bar', price: '150', quantity: '1 pack', image: i6, q1: 1 },
  { id: 4, name: 'Max Protein Choco Bar', price: '60', quantity: '1 pack', image: i7, q1: 1 },
  { id: 3, name: 'No Cow Protein Bar', price: '30', quantity: '1 pack', image: i4, q1: 1 },
  { id: 5, image: p1, name: 'NAKPRO Perform Whey Protein chocolate', price: '1500', quantity: '100 gram', q1: 1 },
  { id: 6, image: p2, name: "MuscleBlaze Beginner's Protein", quantity: '100 gram', price: '1499', q1: 1 },
  { id: 7, image: p3, name: 'NAKPRO Impact Whey Protein', quantity: ' 1 kg', price: '999', q1: 1 },
  { id: 8, image: p4, name: 'AS-IT-IS Nutrition ATOM Whey Protein', quantity: '1 kg', price: '999', q1: 1 },
  { id: 9, image: p5, name: 'Oats', quantity: '100 gram', price: '40', q1: 1 },
  { id: 10, image: p6, name: 'Eggs', quantity: '1 tray', price: '45', q1: 1 },
  { id: 11, image: p7, name: 'Beaf', quantity: '1 kg', price: '500', q1: 1 },
  { id: 12, image: p8, name: 'Sausage', quantity: '12 pieces', price: '150', q1: 1 },
  { id: 13, image: p9, name: 'Dragon fruit', quantity: '2 pcs', price: '50', q1: 1 },
  { id: 14, image: p10, name: 'Blue berry', quantity: '500g', price: '25', q1: 1 },
  { id: 15, image: f1, name: 'Red cherry', quantity: '250g', price: '60', q1: 1 },
  { id: 16, image: f2, name: 'Kwangtung Fresh', quantity: '4 Pcs', price: '20', q1: 1 },
  { id: 17, image: f3, name: 'Fresh orange', quantity: '12 pcs', price: '10', q1: 1 },
  { id: 18, image: f4, name: 'red guava', quantity: '2 kg', price: '90', q1: 1 },
  { id: 19, image: veg1, name: 'Tomato', quantity: '500g', price: '15', q1: 1 },
  { id: 20, image: veg2, name: 'Fresh Lemon', quantity: '1 kg', price: '100', q1: 1 },
  { id: 21, image: kivi, name: 'Kiwi', quantity: '1 kg', price: '200', q1: 1 },
  { id: 22, image: apple, name: 'Green Apple', quantity: '1 kg', price: '60', q1: 1 },
  { id: 23, image: carrot, name: 'carrot', quantity: '1 kg', price: '70', q1: 1 },
  { id: 24, image: graps, name: 'Delicious Grapes', quantity: '1 kg', price: '20', q1: 1 },
];

const meal = [
  { id: 1, name: 'Avocado Salad', image: meal1, price: '500', quantity: '1 plat', q1: 1 },
  { id: 2, name: 'Soup Dumplings', image: meal2, price: '150', quantity: '1 plat', q1: 1 },
  { id: 3, name: 'Chicken Salad', image: meal3, price: '250', quantity: '1 plat', q1: 1 },
  { id: 4, name: 'Potato Salad', image: meal4, price: '340', quantity: '1 plat', q1: 1 },
  { id: 5, name: 'Pasta', image: meal5, price: '600', quantity: '1 plat', q1: 1 },
  { id: 6, name: 'Watermelon Salad Salad', image: meal6, price: '540', quantity: '1 plat', q1: 1 },
]

var cartitem = []
const Product = () => {

  const images = [pc2, pc1, pc3];
  const [productList, setProductList] = useState(p);
  const [productList1, setProductList1] = useState(meal);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

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
    cartitem.push(v1);
  };

  const handleIncrease = (id) => {
    setProductList(productList.map(product =>
      product.id === id
        ? { ...product, q1: product.q1 + 1 }
        : product
    ));
  };

  const handleDecrease = (id) => {
    setProductList(productList.map(product =>
      product.id === id && product.q1 > 1
        ? { ...product, q1: product.q1 - 1 }
        : product
    ));
  };

  const handleIncrease1 = (id) => {
    setProductList1(productList1.map(product =>
      product.id === id
        ? { ...product, q1: product.q1 + 1 }
        : product
    ));
  };

  const handleDecrease1 = (id) => {
    setProductList1(productList1.map(product =>
      product.id === id && product.q1 > 1
        ? { ...product, q1: product.q1 - 1 }
        : product
    ));
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="App">
          <div className="carousel">
            <div className="carousel-slides">
              <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            </div>
          </div>
          <h1 style={{ marginTop: '50px', color: '#6c7fd8' }}>PREPACKED MEAL</h1>
          <div className="product123">
            {productList1.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h5>{product.name}</h5>
                <p>₹ {product.price}</p>
                <p>{product.q1 > 0 ? `${product.quantity} Pack` : 'Out of Stock'}</p>
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
                  addtocart(product.name, product.price, product.quantity, product.image, product.q1);
                  alert('Your ' + product.name + ' is added to cart');
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <h1 style={{ marginTop: '50px', color: '#6c7fd8' }}>BEST SALLER FOR GYM RATES</h1>
          <div className="product">
            {productList.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h5>{product.name}</h5>
                <p>₹ {product.price}</p>
                <p>{product.q1 > 0 ? `${product.quantity} Pack` : 'Out of Stock'}</p>
                <div className="button-container">
                  <button className="quantity-combined-btn">
                    <span className="decrease" onClick={() => handleDecrease(product.id)}>
                      –
                    </span>
                    <span className="quantity-value">{product.q1}</span>
                    <span className="increase" onClick={() => handleIncrease(product.id)}>
                      +
                    </span>
                  </button>
                </div>
                <button onClick={() => {
                  addtocart(product.name, product.price, product.quantity, product.image, product.q1);
                  alert('Your ' + product.name + ' is added to cart')
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
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

    </>
  );
};
export { cartitem }
export default Product;


