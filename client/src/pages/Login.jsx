import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("https://e-commerce-website-2hpn.onrender.com/api/auth/login", values);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.isAdmin ? "admin" : "user");
      localStorage.setItem("userName", res.data.user.name);

      message.success("Login successful!");
      navigate("/");
    } catch (err) {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* 👇 New: Register link */}
        <Text style={{ display: "block", textAlign: "center", marginTop: "16px" }}>
          Not registered?{" "}
          <Link to="/register" style={{ color: "#1890ff" }}>
            Create an account
          </Link>
        </Text>
      </Card>
    </div>
  );
}

export default Login;
