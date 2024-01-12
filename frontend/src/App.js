import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./utils/cartContext";
import {
  HomePage,
  LoginPage,
  ItemPage,
  CartPage,
  CheckoutPage,
  ShopPage,
} from "./Pages";
import CustomBake from "./Pages/CustomBake";
import FAQ from "./Pages/FAQ";
import NotFound from './Pages/NotFound';
import AllComponents from "./components";
import Box from "@mui/material/Box";
import "./app.css";
import Footer from "./components/Footer";
import styled from "styled-components";
import banner from "./static/image/mainbanner.jpg";
import Instagram from "./Pages/Instagram";
import { Typography } from "@mui/material";

const Banner = styled(Box)`
  margin: 0 auto;
  background-image: url(${banner});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<APPOnHomePage element={<HomePage />} />} />
          <Route path="*" element={<AppWithNavBar element={<NotFound />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/product/:id"
            element={<AppWithNavBar element={<ItemPage />} />}
          />
          <Route
            path="/cart"
            element={<AppWithNavBar element={<CartPage />} />}
          />
          <Route
            path="/checkout"
            element={<AppWithNavBar element={<CheckoutPage />} />}
          />
          <Route
            path="/shop"
            element={<AppWithNavBar element={<ShopPage />} />}
          />
          <Route
            path="/custombake"
            element={<AppWithNavBar element={<CustomBake />} />}
          />
          <Route
            path="/fqa"
            element={<AppWithNavBar element={<FAQ />} />}
          />
          <Route
            path="/ins"
            element={<AppWithNavBar element={<Instagram />} />}
          />
        </Routes>
      </CartProvider>
    </Router>
  );
};

// eslint-disable-next-line react/prop-types
const AppWithNavBar = ({ element }) => (
  <>
    {/* <AllComponents.TopBar /> */}
    <AllComponents.ResponsiveAppBar />
    <Box maxWidth="lg" m='0 auto'>
      {element}
    </Box>
    <Footer />
  </>
);

// eslint-disable-next-line react/prop-types
// const APPWithoutNavBar = ({ element }) => (
//   <>
//     {/* <AllComponents.TopBar /> */}
//     <Box maxWidth="lg" m='0 auto'>{element}</Box>
//     <Footer />
//   </>
// );

// eslint-disable-next-line react/prop-types
const APPOnHomePage = ({ element }) => (
  <>
    {/* <AllComponents.TopBar /> */}
    <AllComponents.ResponsiveAppBar position="fixed" />
    <Banner sx={{ display: 'flex', justifyContent: 'flex-end' }}> 
      <Box
        sx={{
          display: "flex",
          width: { xs: '100%', sm: '50%' },
          height: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h4" alignItems="center" sx={{ color: "white", fontFamily: "Cigars, Sans-serif", lineHeight: "1.25rem" }} gutterBottom>
          FRESHLY HAND CRAFTED
        </Typography>
        <Typography variant="h4" alignItems="center" sx={{ color: "white", fontFamily: "Cigars, Sans-serif", lineHeight: "1.25rem" }} gutterBottom>
          Premium Ingredients
        </Typography>
      </Box>
    </Banner>
    <Box maxWidth="lg" m='0 auto'>
      {element}
    </Box>
    <Footer />
  </>
)

export default App;
