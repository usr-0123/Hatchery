import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Admin_Home from '../components/Layout/Dashboard/Admin/Admin_Home.jsx';
import Admin_Users from '../components/Layout/Dashboard/Admin/Admin_Users.jsx';
import Admin_Products from '../components/Layout/Dashboard/Admin/Admin_Products.jsx';
import Admin_Sales from '../components/Layout/Dashboard/Admin/Admin_Sales.jsx';

const Admin_Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Admin_Home />} />
        <Route path='/admin-home' element={<Admin_Home />} />
        <Route path='/admin-products' element={<Admin_Products />} />
        <Route path='/admin-users' element={<Admin_Users />} />
        <Route path='/admin-Sales' element={<Admin_Sales />} />
      </Routes>
    </div>
  );
};

export default Admin_Dashboard;

// reports module