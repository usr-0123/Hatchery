import React from "react";
import { UserOutlined, HomeOutlined, UsergroupDeleteOutlined, ProductOutlined } from '@ant-design/icons';

export let farmerSidebarItems = [
    { key: 'farmerHome', label: 'Home', path: '/dashboard/farmer/farmer-home', icon: <HomeOutlined /> },
    { key: 'userProfile', label: 'Profile', path: '/dashboard/farmer', icon: <UserOutlined /> },
];

export let adminSideBarItems = [
    { key: 'adminHome', label: 'Home', path: '/dashboard/admin/admin-home', icon: <HomeOutlined /> },
    { key: 'users', label: 'Users', path: '/dashboard/admin/admin-users', icon: <UsergroupDeleteOutlined /> },
    { key: 'products', label: 'Products', path: '/dashboard/admin/admin-products', icon: <ProductOutlined /> },
    { key: 'adminProfile', label: 'Profile', path: '/dashboard/admin', icon: <UserOutlined /> },
];

export let employeeSideBarItems = [
    { key: 'employeeHome', label: 'Home', path: '/dashboard/employee', icon: <HomeOutlined /> },
    { key: 'adminProfile', label: 'Profile', path: '/dashboard/employee', icon: <UserOutlined /> },
];