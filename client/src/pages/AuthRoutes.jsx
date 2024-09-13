import React from 'react'
import { Route, Routes } from 'react-router-dom';

import LoginPage from './auth/LoginPage.jsx';
import RegisterPage from './auth/RegisterPage.jsx';

const AuthRoutes = () => {
  return (
    <div style={{minHeight: '97vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default AuthRoutes;