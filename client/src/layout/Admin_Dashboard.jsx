import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Admin_Home from '../components/Layout/Dashboard/Admin/Admin_Home.jsx';
import Admin_Users from '../components/Layout/Dashboard/Admin/Admin_Users.jsx';
import Admin_Products from '../components/Layout/Dashboard/Admin/Admin_Products.jsx';
import Admin_Sales from '../components/Layout/Dashboard/Admin/Admin_Sales.jsx';
import AdminProductionDashboard from '../components/Page/Admin/AdminProductionDashboard.jsx';
import NotifyHatch from '../components/NotifyHatch.jsx';
import Profile from '../pages/Profile.jsx';

const Admin_Dashboard = () => {
  return (
    <div>
      <NotifyHatch />
      <Routes>
        <Route index element={<Admin_Home />} />
        <Route path='/admin-home' element={<Admin_Home />} />
        <Route path='/admin-products' element={<Admin_Products />} />
        <Route path='/admin-production' element={<AdminProductionDashboard />} />
        <Route path='/admin-Sales' element={<Admin_Sales />} />
        <Route path='/admin-users' element={<Admin_Users />} />
        <Route path='/admin-profile' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Admin_Dashboard;
