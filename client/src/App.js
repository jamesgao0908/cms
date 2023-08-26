import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./utils/cartContext";
import { HomePage, LoginPage, ProductPage, CartPage } from "./Pages";
import { TopBar } from "./components";
import Container from "@mui/material/Container";
import "./app.css";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<AppWithTopBar element={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/product/:id"
            element={<AppWithTopBar element={<ProductPage />} />}
          />
          <Route
            path="/cart"
            element={<AppWithTopBar element={<CartPage />} />}
          />
        </Routes>
      </CartProvider>
    </Router>
  );
};

// eslint-disable-next-line react/prop-types
const AppWithTopBar = ({ element }) => (
  <Container maxWidth="lg">
    <TopBar />
    {element}
  </Container>
);

// eslint-disable-next-line react/prop-types
const APPWithoutTopBar = ({ element }) => (
  <Container maxWidth="lg">{element}</Container>
);

export default App;
