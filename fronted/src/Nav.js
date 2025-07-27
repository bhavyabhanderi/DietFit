import React,{useState,useEffect} from "react";
import "./Nav.css"; // The CSS will be in this file
import i1 from './Image/logo.webp'
import { useLocation, useNavigate } from "react-router-dom";
const Nav = () => {
  
  const navigate =useNavigate()
  const query = new URLSearchParams(useLocation().search);
  const username = query.get('username');
  const email = query.get('email');  
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Use useEffect to handle the state update only when the component mounts or query changes
  useEffect(() => {
    // Check if both name and email are present in the URL
    if (username && email) {
      setIsLoggedIn(true);  // Show logout button
    } else {
      setIsLoggedIn(false); // Show login button
    }
  }, [username, email]);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logic for logout can be added here (clear tokens, redirect, etc.)
      navigate("/"); // Redirect to homepage on logout
    } else {
      navigate("/login"); // Redirect to login page
    }
  };


  return (
    
    <>
    <div className="n-container">
      
    <div className="navbar">
      <div className="navbar-bottom">
        <div className="navbar-logo">
          <img src={i1} alt="Logo" />
          <h2>Diet Fit</h2>
        </div>
        

        {/* <div className="navbar-search">
          <select>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
          </select>
          <input type="text" placeholder="Search products..." name="search"/>
        </div> */}

        <div className="navbar-menu">
        <ul>
          <li><a href="#" onClick={()=>{navigate(`/home?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Home</a></li>
          <li><a href="#" onClick={()=>{navigate(`/product?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} >Products</a></li>
          <li><a href="#" onClick={()=>{navigate(`/Cart?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>Cart </a></li>
          <li><a href="#" onClick={()=>{navigate(`/chatwithus?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>FAQ</a></li>
          <li><a href="#" onClick={()=>{navigate(`/chatbox?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>24/7 Advice</a></li>
          <li><a href="#" onClick={()=>{navigate(`/about?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}}>about</a></li>
          <li>
          <a onClick={handleAuthAction} style={{cursor:'pointer'}}>
            {isLoggedIn ? 'logout' : 'login'}
          </a>
        </li>
        </ul>
        </div>
      </div>

      

      
    </div>
    </div>
    </>
  );
};

export default Nav;
