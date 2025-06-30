import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://e-commerce-website-2hpn.onrender.com/api/auth/register", values);
      message.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      message.error("Registration failed. Try again.");
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
          Register
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Email format is invalid" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="number"
            rules={[
              { required: true, message: "Please enter your Mobile Number" },
              {
                pattern: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit Mobile Number",
              },
            ]}
          >
            <Input placeholder="Your Mobile Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your Address" }]}
          >
            <Input placeholder="Your Address" />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* 👇 Login redirect link */}
        <Text style={{ display: "block", textAlign: "center", marginTop: "16px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1890ff" }}>
            Login here
          </Link>
        </Text>
      </Card>
    </div>
  );
}

export default Register;
