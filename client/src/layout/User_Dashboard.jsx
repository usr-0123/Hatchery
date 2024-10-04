import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Farmer_Home from '../components/Layout/Dashboard/Farmer/Farmer_Home.jsx';
import Profile from '../pages/Profile.jsx';

function User_Dashboard() {

  return (
    <>
      <Routes>
        <Route index element={<Farmer_Home />} />
        <Route path='/farmer-home' element={<Farmer_Home />} />
        <Route path='/farmer-profile' element={<Profile />} />
      </Routes>
    </>
  );
};

export default User_Dashboard;