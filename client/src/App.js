
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Pages/Product';
import { 
  ConfigsPage,
  DashboardPage,
  HomePage,
  LoginPage,
  
} from './Pages';
// import DashboardPage from './Pages/DashboardPage'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/config" element={<ConfigsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App;