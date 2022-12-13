import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import Cart from './pages/Cart';
import UpdateCartItem from './pages/UpdateCartItem';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<AddProduct/>} />
          <Route path='/products' exact element={<Products/>} />
          <Route path='/cart' exact element={<Cart/>} />
          <Route path='/cart/update' exact element={<UpdateCartItem/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
