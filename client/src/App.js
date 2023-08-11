
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { Home  } from './Pages';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Layout from './utils/Layout';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/dashboard" element={<Layout />} />
    </Routes>
  )
}

export default App;