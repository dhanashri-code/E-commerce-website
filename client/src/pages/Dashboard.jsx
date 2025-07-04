import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Typography, message, Empty, Divider } from "antd";
import Navbarr from "../component/Navbarr";

const { Title, Text } = Typography;

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/orders", {
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
                  marginBottom: "1px",
                  borderRadius: "10px",
                  backgroundColor: "#e3f2fd",
                  border: "1px solid #90caf9",
                }}
                title={
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <Text strong style={{ color: "#0d47a1", marginRight: "10px" }}>
                      Order Total :
                    </Text>

                    <Text type="success"> ${order.total.toFixed(2)}</Text>
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
                  renderItem={(item) => {
                    const productName = item.productId?.title ?? "Unknown Product";
                    const qty = item.quantity ?? 0;

                    return (
                      <List.Item key={item.productId?._id || Math.random()}>
                        <Text>
                          <strong>Product Name:</strong> {productName}
                        </Text>{" "}
                        <br />
                        <Text>
                          <strong>Qty:</strong> {qty}
                        </Text>
                      </List.Item>
                    );
                  }}
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
