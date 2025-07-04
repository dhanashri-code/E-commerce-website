import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Layout,
  Button,
  Typography,
  Dropdown,
  Avatar,
  Space,
  Drawer,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  AppstoreAddOutlined,
  DashboardOutlined,
  ProfileOutlined,
  MenuOutlined,
  OrderedListOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "User";

  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const dropdownMenu = {
    items: [
      {
        key: "profile",
        icon: <ProfileOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: handleLogout,
      },
    ],
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    ...(token && role === "admin"
      ? [
          {
            key: "admin",
            icon: <AppstoreAddOutlined />,
            label: <Link to="/admin">Admin Panel</Link>,
          },
          {
            key: "allproducts",
            icon: <UnorderedListOutlined />,
            label: <Link to="/admin/products">All Products</Link>,
          },
        {
            key: "viewAllOrders",
            icon: <OrderedListOutlined />,
            label: <Link to="/admin/orders">View All Orders</Link>,
          },
        ]
      : []),
    ...(token && role !== "admin"
      ? [
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">My Order</Link>,
          },
          {
            key: "cart",
            icon: <ShoppingCartOutlined />,
            label: <Link to="/cart">Cart</Link>,
          },
        ]
      : []),
  ];

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          paddingInline: 16,
        }}
      >
        {/* Mobile Menu Icon */}
        <div className="mobile-toggle" style={{ display: "none" }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white", fontSize: 20 }} />}
            onClick={showDrawer}
          />
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ flex: 1 }}>
          <Menu
            theme="dark"
            mode="horizontal"
            items={menuItems}
            style={{ minWidth: "200px", display: "flex", flexWrap: "wrap" }}
          />
        </div>

        {/* Auth Buttons or Avatar */}
        <div>
          {!token ? (
            <>
              <Link to="/login">
                <Button icon={<LoginOutlined />} style={{ marginRight: 8 }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary" icon={<UserOutlined />}>
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <Dropdown menu={dropdownMenu} placement="bottomRight" arrow>
              <Space style={{ cursor: "pointer" }}>
                <Avatar style={{ backgroundColor: "#87d068" }}>
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <Text style={{ color: "white" }}>{userName}</Text>
              </Space>
            </Dropdown>
          )}
        </div>
      </Header>

      {/* Drawer for Mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          items={menuItems}
          onClick={onClose}
          style={{ borderRight: 0 }}
        />
      </Drawer>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
