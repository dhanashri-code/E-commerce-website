import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Typography, message, Empty } from "antd";
import Navbarr from "../component/Navbarr";

const { Title, Text } = Typography;

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://e-commerce-website-2hpn.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => message.error("Failed to load orders"));
  }, []);

  return (
    <>
      <Navbarr />
      <div
        style={{
          padding: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#f4f7fc",
          borderRadius: "8px",
          minHeight: "100vh",
        }}
      >
        <Title level={2} style={{ marginBottom: "24px" }}>
          My Orders
        </Title>

        {orders.length === 0 ? (
          <Empty description="You haven't placed any orders yet." />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={orders}
            renderItem={(order) => (
              <Card
                key={order._id}
                style={{
                  marginBottom: "16px",
                  borderRadius: "10px",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid #90caf9",
                }}
                title={
                  <div style={{ display: "flex", justifyContent: "" }}>
                    <Text strong style={{ color: "#0d47a1" }}>
                      Order Total -
                    </Text>
                    <Text type="success">${order.total.toFixed(2)}</Text>
                  </div>
                }
                extra={
                  <Text type="secondary">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                }
              >
                <List
                  size="small"
                  dataSource={order.items}
                  renderItem={(item) => (
                    <List.Item key={item.productId._id}>
                      <Text>

                        <strong>Qty:</strong> {item.quantity}
                      </Text>
                    </List.Item>
                  )}
                />
              </Card>
            )}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
