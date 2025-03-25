// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import NotFound from './components/404';
import Login from './components/login';
import Signup from './components/signup';
import './index.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={isAuthenticated() ? 
          <App /> : <Navigate to="/login" />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>,
);
