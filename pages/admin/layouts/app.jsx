import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UserAddOutlined,
    FormOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import Link from "next/link";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;


const Navbar = (props) => {


    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer}} = theme.useToken();

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogoutBtn = async () => {
        const nextUrl = searchParams.get("next");
        router.push(nextUrl ?? "/login");
    };

    const getSelectedKey = (path) => {
        const currentPath = router.pathname;
        const key = currentPath.split('/').slice(-2).join('/')
        return key === path;
    };


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined/>}>
                        <Link href="/admin">Admin</Link>
                    </Menu.Item>
                    <SubMenu key="sub5" icon={<UserOutlined/>} title="Products">
                        <Menu.Item key="13"
                                   className={getSelectedKey("contact/update") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/products/add">Add</Link>
                        </Menu.Item>
                        <Menu.Item key="17"
                                   className={getSelectedKey("slogan/about") ? "ant-menu-item-selected" : ""}>
                            <Link href="/admin/products/all">All</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="23" onClick={handleLogoutBtn} icon={<LogoutOutlined/>}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, backgroundColor: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{margin: '24px 16px', padding: 24, minHeight: 280}}>
                    <div style={{minHeight: '80vh'}}>
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};


export default Navbar;