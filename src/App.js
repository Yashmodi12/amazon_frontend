import './App.css';
import Header from './Components/header';
import Footer from './Components/footer';
import Homescreen from './screens/homescren';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/productscreen';
import Loginscreen from './screens/Loginscreen';
import Regscreen from './screens/regscreen';
import { useState } from 'react';
import Cartscreen from './screens/Cartscreen';
import Shippingscreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const [token, settoken] = useState(localStorage.getItem('token') || '')
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  return (
    <BrowserRouter>
      <div className="App">
        <Header setuserInfo={setUserInfo} settoken={settoken} userInfo={userInfo} token={token} cartItems={cartItems} setcartItems={setcartItems} />
        <main style={{ minHeight: '107.8vh' }}>
          <Routes>
            <Route path='/product' element={<Homescreen />} />
            <Route path='/product/:id' element={<ProductScreen cartItems={cartItems} setcartItems={setcartItems}/>} />
            <Route path='/' element={<Loginscreen setUserInfo={setUserInfo} setToken={settoken} />} />
            <Route path='/registration' element={<Regscreen setUserInfo={setUserInfo} setToken={settoken} />} />
            <Route path="/Addtocart" element={<Cartscreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/Shipping" element={<Shippingscreen/>} />
            <Route path="/Placeorder" element={<PlaceOrderScreen cartItems={cartItems} setcartItems={setcartItems} />}/>

            <Route />
          </Routes>
        </main >
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;


