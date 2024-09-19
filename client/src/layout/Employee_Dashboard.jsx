import React from 'react'

import { Route, Routes } from 'react-router-dom';

import Employee_Home from '../components/Layout/Dashboard/Employee/Employee_Home.jsx';
import Employee_Sales from '../components/Layout/Dashboard/Employee/Employee_Sales.jsx';
import Employee_Incubation from '../components/Layout/Dashboard/Employee/Employee_Incubation.jsx';
import Employee_Hatchery from '../components/Layout/Dashboard/Employee/Employee_Hatchery.jsx';

const Employee_Dashboard = () => {
  return (
    <Routes>
      <Route index element={<Employee_Home />} />
      <Route path='/employee-home' element={<Employee_Home />} />
      <Route path='/employee-sales' element={<Employee_Sales />} />
      <Route path='/employee-incubation' element={<Employee_Incubation />} />
      <Route path='/employee-hatchery' element={<Employee_Hatchery />} />
    </Routes>
  );
};

export default Employee_Dashboard;

// Eggs collection
// Sales
// incubation
// hatchery