import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import SignUpForm from '../components/forms/SignUpForm';
import LoginForm from '../components/forms/LoginForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AppRoutes;
