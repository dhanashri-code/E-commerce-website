import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  List,
  Typography,
  message,
  Empty,
  Spin,
  Layout,
} from "antd";
import Navbarr from "../component/Navbarr";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");

    if (!token || role !== "admin") {
      message.error("Access denied");
      return;
    }

    axios
      .get("https://e-commerce-website-2hpn.onrender.com/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setOrders(res.data))
      .catch(err => {
        message.error("Failed to load all orders");
        setOrders([]);
        console.error(err);
      });
  }, []);

  if (orders === null) {
    return (
      <>
        <Navbarr />
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin size="large" />
        </div>
      </>
    );
  }

  return (
    <Layout>
  <Navbarr />
  <Content
    style={{
      padding: "20px 40px",
      maxWidth: "1000px",            // ✅ Wider content area
      margin: "0 auto",
      backgroundColor: "#f4f7fc",
      borderRadius: "8px",
      minHeight: "100vh",
      width: "100%",                 // ✅ Ensures full width inside Layout
    }}
  >
    <Title level={2} style={{ marginBottom: 24 }}>
      All User Orders
    </Title>

    {orders.length === 0 ? (
      <Empty description="No orders have been placed yet." />
    ) : (
      <List
        itemLayout="vertical"
        dataSource={[...orders].reverse()}
        renderItem={order => (
          <Card
            key={order._id}
            style={{
              marginBottom: 12,
              borderRadius: 10,
              backgroundColor: "#e3f2fd",
              border: "1px solid #90caf9",
            }}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text strong style={{ color: "#0d47a1" }}>
                  Order by:{" "}
                  {order.userId?.name || order.userId?.email || "Unknown"}
                </Text>
                <Text type="secondary">
                  {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </div>
            }
            extra={
              <Text type="success" style={{ fontWeight: "bold" , marginLeft:"20px"}}>
                ${order.total?.toFixed(2) ?? "0.00"}
              </Text>
            }
          >
            <List
              size="small"
              dataSource={order.items || []}
              renderItem={item => {
                const title = item.productId?.title ?? "Unknown product";
                const qty = item.quantity ?? 0;
                return (
                  <List.Item key={item.productId?._id || Math.random()}>
                    <Text>
                      {title} — <strong>Qty:</strong> {qty}
                    </Text>
                  </List.Item>
                );
              }}
            />
          </Card>
        )}
      />
    )}
  </Content>
</Layout>

  );
}
