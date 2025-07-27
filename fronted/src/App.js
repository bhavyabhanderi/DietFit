import './App.css';
import Home from './Home.js';
import Product from './Product.js'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from './product/Login.js';
import Signup from './product/Signup.js'
import About  from './product/About.js';
import Cart from './product/Cart.js'
import Chatwithus from './product/Chatwithus.js';
import Chatbox from './product/chatbox.js';
function App() {
  return (
    <>
    
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/admin/login" element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/chatwithus' element={<Chatwithus/>} />
        <Route path='/chatbox' element={<Chatbox/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

