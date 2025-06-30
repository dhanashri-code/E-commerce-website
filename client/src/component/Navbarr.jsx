import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Layout,
  Button,
  Typography,
  Dropdown,
  Avatar,
  Space,
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
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "User";

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
        label: <Link to="/profile">Profile</Link>, // Navigates to dashboard for both admin/user
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
          icon: <AppstoreAddOutlined />,
          label: <Link to="/admin/products">All Products</Link>,
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
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, minWidth: "200px" }}
      />

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
  );
}

export default Navbar;
