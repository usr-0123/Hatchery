import React, { useEffect, useState } from 'react'

import { Button, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout.js';
import { LogoutOutlined, MenuFoldOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

import { clearStorageOnTokenExpiry, decodeToken } from '../helpers/token.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../helpers/logout.js';
import Sider from 'antd/es/layout/Sider.js';

import { adminSideBarItems, userSidebarItems } from '../components/Layout/SidebarItems.jsx';
import User_Dashboard from './User_Dashboard.jsx';
import Admin_Dashboard from './Admin_Dashboard.jsx';
import Employee_Dashboard from './Employee_Dashboard.jsx';

// Check user role first
const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const user = decodeToken();
  console.log(user);

  const handleLogout = async () => {
    const route = await logout();
    navigate(route.route, { replace: true });
  };

  useEffect(() => {
    const response = clearStorageOnTokenExpiry();

    if (response && response.route) {
      navigate(response.route, { replace: true });
    };
  }, [navigate]);

  useEffect(() => {
    const user = decodeToken();

    if (user) {
      setUserDetails(user);
    }

    if (!user) {
      handleLogout()
    } else if (user.userRole === 'Employee' && !login) {
      setIsAdmin(false);
      setLogin(!login);
      navigate("/dashboard/user", { replace: true });
    } else if (user.userRole === 'Admin' && !login) {
      setIsAdmin(true);
      setLogin(!login);
      navigate("/dashboard/admin", { replace: true });
    } else {
      setIsAdmin(false);
      setLogin(!login);
      navigate("/dashboard/admin", { replace: true });
    };
  }, [navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (item) => {

    if (!item && !item.key) {
      logout();
    } else {
      navigate(item.item.props.path);
    }
  };

  return (
    <Layout style={{ minHeight: '97vh' }} >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'transparent',
          justifyContent: 'space-between'
        }}>
        <h1 style={{ color: '#fff' }}>Hatchery</h1>
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
              defaultOpenKeys={isAdmin ? ['adminHome'] : ['userHome']}
              style={{
                height: '100%',
              }}
              items={isAdmin ? adminSideBarItems : userSidebarItems}
              onClick={(e) => handleMenuClick(e)}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="user/*" element={<User_Dashboard />} />
              <Route path="admin/*" element={<Admin_Dashboard />} />
              <Route path='employee/*' element={<Employee_Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Hatchery ©{new Date().getFullYear()} Created by Luwi
      </Footer>
    </Layout>
  )
}

export default Dashboard;