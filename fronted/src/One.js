import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import i2 from './Image/i11.jpg'

import './One.css'
const One=()=>{
    const navigate =useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const username = query.get('username');
    const email = query.get('email');
    return(
        <>

        <div className="hero-section">
            <div className="content">
                <div className="text-content">
                <h3>Welcome to Diet Fit</h3>
                <h1>get <span className="highlighted"> Healthy </span> Diet</h1>
                <button className="shop-btn"><a href="#" style={{textDecoration:'none'}} onClick={()=>{navigate(`/product?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}} >Shop now</a></button>
                </div>
                <div className="image-content">
                <img src={i2} alt="Fresh products" />
                </div>
            </div>
            </div>
        </>
    )
}
export default One;
