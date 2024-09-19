import React, { useEffect, useState } from 'react'
import { Button, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout.js';
import { LogoutOutlined, MenuFoldOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { clearStorageOnTokenExpiry, decodeToken } from '../helpers/token.js';
import { logout } from '../helpers/logout.js';
import Sider from 'antd/es/layout/Sider.js';

import { adminSideBarItems, employeeSideBarItems, farmerSidebarItems } from '../components/Layout/SidebarItems.jsx';

import User_Dashboard from './User_Dashboard.jsx';
import Admin_Dashboard from './Admin_Dashboard.jsx';
import Employee_Dashboard from './Employee_Dashboard.jsx';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sidebarItems, setSidebarItems] = useState(null);
  const [role, setRole] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = decodeToken();

    if (!user) {
      handleLogout();
    } else {
      setUserDetails(user);
      setRole(user.userRole);
    }

    const tokenExpiryResponse = clearStorageOnTokenExpiry();
    if (tokenExpiryResponse?.route) {
      navigate(tokenExpiryResponse.route, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (role && !login) {
      setLogin(true);

      if (role === 'Employee') {
        navigate("/dashboard/employee", { replace: true });
      } else if (role === 'Admin') {
        navigate("/dashboard/admin", { replace: true });
      } else if (role === 'User') {
        navigate("/dashboard/farmer", { replace: true });
      }
    }
  }, [role, login, navigate]);

  useEffect(() => {
    if (role) {
      switch (role) {
        case 'Admin':
          setSidebarItems(adminSideBarItems);
          break;
        case 'Employee':
          setSidebarItems(employeeSideBarItems);
          break;
        case 'User':
          setSidebarItems(farmerSidebarItems);
          break;
        default:
          setSidebarItems(null);
      }
    }
  }, [role]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (item) => {
    if (item?.key) {
      navigate(item.item.props.path);
    } else {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    const route = await logout();
    navigate(route.route, { replace: true });
  };

  return (
    <Layout style={{ height: '97vh', overflow: 'hidden' }} >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'transparent',
          justifyContent: 'space-between'
        }}>
        <h1 style={{ color: '#fff' }}>Hatchery Management System</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
          minWidth: '10%',
          gap: '10%',
          fontWeight: '1000',
          justifyContent: 'space-between'
        }}>
          <p>
            {userDetails ? userDetails.userEmail : <UserOutlined />}
          </p>

          <LogoutOutlined onClick={() => handleLogout()} />
        </div>
      </Header>

      <Content style={{
        padding: '10px',
      }}>
        <Layout style={{
          padding: '24px 0',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
          <Sider
            style={{
              background: colorBgContainer,
              height: 'max-content'
            }}
            width={200}
            collapsed={isCollapsed}
          >
            <div style={{
              display: 'flex',
              justifyContent: isCollapsed ? 'center' : 'flex-end',
              padding: '10px',
              flexWrap: 'nowrap',
            }}>

              <Button
                icon={isCollapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={sidebarItems && sidebarItems[0].key}
              style={{
                height: '100%',
              }}
              items={sidebarItems}
              onClick={(e) => handleMenuClick(e)}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              overflow: 'auto',
              height: '75vh',
            }}
          >
            <Routes>
              <Route path="farmer/*" element={<User_Dashboard />} />
              <Route path="admin/*" element={<Admin_Dashboard />} />
              <Route path='employee/*' element={<Employee_Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '1vh'
        }}
      >
        Hatchery ©{new Date().getFullYear()} Created by Luwi
      </Footer>
    </Layout>
  )
}

export default Dashboard;