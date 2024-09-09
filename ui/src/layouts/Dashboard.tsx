import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;
import type { MenuProps } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const Dashboard: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return (
        <Layout>
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
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={items2}
                        />
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
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