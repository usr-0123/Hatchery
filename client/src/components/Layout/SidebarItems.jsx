import React from "react";
import { UserOutlined, HomeOutlined } from '@ant-design/icons';

export let farmerSidebarItems = [
    { key: 'farmerHome', label: 'Home', path: '/dashboard/farmer', icon: <HomeOutlined /> },
    { key: 'userProfile', label: 'Profile', path: '/dashboard/farmer', icon: <UserOutlined /> },
];

export let adminSideBarItems = [
    { key: 'adminHome', label: 'Home', path: '/dashboard/admin', icon: <HomeOutlined /> },
    { key: 'adminProfile', label: 'Profile', path: '/dashboard/admin', icon: <UserOutlined /> },
];

export let employeeSideBarItems = [
    { key: 'employeeHome', label: 'Home', path: '/dashboard/employee', icon: <HomeOutlined /> },
    { key: 'adminProfile', label: 'Profile', path: '/dashboard/employee', icon: <UserOutlined /> },
];