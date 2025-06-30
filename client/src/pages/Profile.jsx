import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, message, Spin, Divider } from "antd";
import Navbarr from "../component/Navbarr";
import axios from "axios";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const borderCardStyle = (color) => ({
    borderLeft: `6px solid ${color}`,
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
});

function Profile() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resUser = await axios.get("https://e-commerce-website-2hpn.onrender.com/api/auth/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(resUser.data);

                if (resUser.data.isAdmin) {
                    const resProducts = await axios.get("https://e-commerce-website-2hpn.onrender.com/api/products");
                    const products = resProducts.data;
                    const categories = new Set(products.map(p => p.category));
                    const inStockCount = products.filter(p => p.inStock).length;
                    const outOfStockCount = products.filter(p => !p.inStock).length;

                    setStats({
                        categoriesCount: categories.size,
                        totalProducts: products.length,
                        totalStock: inStockCount,
                        outOfStock: outOfStockCount,
                    });
                } else {
                    const resOrders = await axios.get("https://e-commerce-website-2hpn.onrender.com/api/orders", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];

                    setStats({
                        cartItems: cart.reduce((acc, item) => acc + item.quantity, 0),
                        placedOrders: resOrders.data.length,
                    });
                }

                setLoading(false);
            } catch (err) {
                console.error("Failed to load profile or stats", err);
                message.error("Something went wrong");
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <>
            <Navbarr />
            <div className="p-6 max-w-6xl mx-auto">

                {loading ? (
                    <Spin size="large" />
                ) : (
                    <>
                        {/* Profile Card */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            <Card
                                bordered
                                style={{
                                    border: "2px solidrgb(141, 148, 157)",
                                    background: "#f9f9f9",
                                    borderRadius: "12px",
                                    maxWidth: "800px",
                                    width: "100%",
                                    padding: "14px 13px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                                }}
                            ><Title level={2}>Welcome, {user?.name || "User"}</Title>

                                <Avatar
                                    size={64}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: "#1677ff", marginBottom: "5px" }}
                                />
                                <Divider></Divider>
                                <h4><Text strong>Name:</Text> {user.name}</h4>
                                <p><Text strong>Email:</Text> {user.email}</p>
                                <p><Text strong>Mobile Number:</Text> {user.number}</p>
                                <p><Text strong>Address:</Text> {user.address}</p>
                                <p><Text strong>Role:</Text> {user.isAdmin ? "Admin" : "User"}</p>
                            </Card>
                        </div>

                        {/* Dashboard Stats */}
                        {user.isAdmin ? (
                            <>
                                <Title level={4} style={{ margin: "24px 0 12px" }}>Admin Dashboard Summary</Title>
                                <Row gutter={[16, 16]} style={{ marginLeft: '20px', marginRight: '20px' }}>
                                    <Col xs={24} md={6}>
                                        <Card title="Total Categories" style={borderCardStyle("#1890ff")} bordered={false}>
                                            <Title level={3}>{stats.categoriesCount}</Title>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Card title="Total Products" style={borderCardStyle("#722ed1")} bordered={false}>
                                            <Title level={3}>{stats.totalProducts}</Title>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Card title="In Stock" style={borderCardStyle("#52c41a")} bordered={false}>
                                            <Title level={3}>{stats.totalStock}</Title>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Card title="Out of Stock" style={borderCardStyle("#f5222d")} bordered={false}>
                                            <Title level={3}>{stats.outOfStock}</Title>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Title level={4} style={{ margin: "54px 60px 12px" }}>Your Activity Summary</Title>

                                <Row gutter={[16, 16]} style={{ marginLeft: '50px', marginRight: '50px' }}>
                                    <Col xs={24} md={12}>
                                        <Card title="Cart Items" style={borderCardStyle("#fa8c16")} bordered={false}>
                                            <Title level={3}>{stats.cartItems}</Title>
                                        </Card>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Card title="Orders Placed" style={borderCardStyle("#13c2c2")} bordered={false}>
                                            <Title level={3}>{stats.placedOrders}</Title>
                                        </Card>
                                    </Col>
                                </Row>

                            </>
                        )}



                    </>
                )}
            </div>
        </>
    );
}

export default Profile;

