import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  List,
  Typography,
  message,
  Empty,
  Spin,
} from "antd";
import Navbarr from "../component/Navbarr";

const { Title, Text } = Typography;

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get("https://e-commerce-website-2hpn.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => {
        setError("Failed to load orders");
        message.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Text type="danger">{error}</Text>
          </div>
        ) : orders.length === 0 ? (
          <Empty description="You haven't placed any orders yet." />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={[...orders].reverse()}
            renderItem={(order) => {
              const totalAmount = parseFloat(order.total ?? 0).toFixed(2);
              return (
                <Card
                  key={order._id}
                  style={{
                    marginBottom: "12px",
                    borderRadius: "10px",
                    backgroundColor: "#e3f2fd",
                    border: "1px solid #90caf9",
                  }}
                  title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Text strong style={{ color: "#0d47a1", marginRight: "10px" }}>
                        Order Total:
                      </Text>
                      <Text type="success">${totalAmount}</Text>
                    </div>
                  }
                  extra={
                    <Text type="secondary">
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  }
                >
                  <List
                    size="small"
                    dataSource={order.items}
                    renderItem={(item, index) => {
                      const productName = item.productId?.title ?? "Unknown Product";
                      const qty = item.quantity ?? 0;
                      const key = item.productId?._id || `${order._id}-${index}`;

                      return (
                        <List.Item key={key}>
                          <Text>
                            <strong>Product Name:</strong> {productName}
                          </Text>
                          <br />
                          <Text>
                            <strong>Qty:</strong> {qty}
                          </Text>
                        </List.Item>
                      );
                    }}
                  />
                </Card>
              );
            }}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
