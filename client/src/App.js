import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CartProvider} from './utils/cartContext'; // 导入购物车上下文
import {HomePage, LoginPage, ProductPage} from './Pages';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
