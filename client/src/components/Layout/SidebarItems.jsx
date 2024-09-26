import React from "react";
import { UserOutlined, HomeOutlined, UsergroupDeleteOutlined, ProductOutlined, LineChartOutlined, ClockCircleOutlined, CheckCircleOutlined, ExperimentOutlined } from '@ant-design/icons';

export let farmerSidebarItems = [
    { key: 'farmerHome', label: 'Home', path: '/dashboard/farmer/farmer-home', icon: <HomeOutlined /> },
    { key: 'userProfile', label: 'Profile', path: '/dashboard/farmer', icon: <UserOutlined /> },
];

export let adminSideBarItems = [
    { key: 'adminHome', label: 'Home', path: '/dashboard/admin/admin-home', icon: <HomeOutlined /> },
    { key: 'products', label: 'Products', path: '/dashboard/admin/admin-products', icon: <ProductOutlined /> },
    { key: 'production', label: 'Production', path: '/dashboard/admin/admin-production', icon: <ExperimentOutlined /> },
    { key: 'sales', label: 'Sales', path: '/dashboard/admin/admin-Sales', icon: <LineChartOutlined /> },
    { key: 'users', label: 'Users', path: '/dashboard/admin/admin-users', icon: <UsergroupDeleteOutlined /> },
    { key: 'adminProfile', label: 'Profile', path: '/dashboard/admin/admin-profile', icon: <UserOutlined /> },
];

export let employeeSideBarItems = [
    { key: 'employeeHome', label: 'Home', path: '/dashboard/employee/employee-home', icon: <HomeOutlined /> },
    { key: 'employeeIncubation', label: 'Incubation', path: '/dashboard/employee/employee-incubation', icon: <ClockCircleOutlined /> },
    { key: 'employeeHatchery', label: 'Hatchery', path: '/dashboard/employee/employee-hatchery', icon: <CheckCircleOutlined /> },
    { key: 'employeeSales', label: 'Sales', path: '/dashboard/employee/employee-sales', icon: <LineChartOutlined /> },
    { key: 'employeeProfile', label: 'Profiles', path: '/dashboard/employee/employee-profile', icon: <UserOutlined /> },
];