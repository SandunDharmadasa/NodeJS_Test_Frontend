import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddProduct from './pages/AddProduct';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<AddProduct/>} />
          <Route path='/products' exact element={<Products/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
