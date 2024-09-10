import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { LogoutOutlined, MenuFoldOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { adminSideBarItems } from "../components/SidebarItems";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();

    const handleMenuClick = (item: any) => {
        console.log(item.item.props.path);

        if (item.item.props.path) {
            navigate(item.item.props.path);
        };
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
                    <p> <UserOutlined /> </p>
                    <LogoutOutlined />
                </div>
            </Header>
            <Content style={{
                padding: '10px'
            }}>
                <Layout>
                    <Sider
                        width={200}
                        style={{ background: colorBgContainer }}
                        collapsed={isCollapsed}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: isCollapsed ? 'center' : 'flex-end',
                            padding: '10px',
                            flexWrap: 'nowrap',
                        }}
                        >

                            <Button
                                icon={isCollapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            />
                        </div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['adminHome']}
                            defaultOpenKeys={['adminHome']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={adminSideBarItems}
                            onClick={(e) => handleMenuClick(e as any)}
                        />
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: '100%',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Content>
        </Layout>
    )
};

export default Dashboard;