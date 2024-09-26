import React from 'react'

import { Route, Routes } from 'react-router-dom';

import Employee_Home from '../components/Page/Employee/Employee_Home.jsx';
import Employee_Sales from '../components/Page/Employee/Employee_Sales.jsx';
import Employee_Incubation from '../components/Page/Employee/Employee_Incubation.jsx';
import Employee_Hatchery from '../components/Page/Employee/Employee_Hatchery.jsx';
import NotifyHatch from '../components/NotifyHatch.jsx';
import Profile from '../pages/Profile.jsx';

const Employee_Dashboard = () => {
  return (
    <>
      <NotifyHatch />
      <Routes>
        <Route index element={<Employee_Home />} />
        <Route path='/employee-home' element={<Employee_Home />} />
        <Route path='/employee-sales' element={<Employee_Sales />} />
        <Route path='/employee-incubation' element={<Employee_Incubation />} />
        <Route path='/employee-hatchery' element={<Employee_Hatchery />} />
        <Route path='/employee-profile' element={<Profile />} />
      </Routes>
    </>
  );
};

export default Employee_Dashboard;