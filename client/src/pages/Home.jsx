import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbarr from "../component/Navbarr";
import EcomImage from '../assets/e-commerce-shopping.png';
import Logo from '../assets/logo.png';

const { Title, Paragraph } = Typography;
const { Option } = Select;

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `https://e-commerce-website-2hpn.onrender.com/api/products?category=${category}`
          : `https://e-commerce-website-2hpn.onrender.com/api/products`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch {
        message.error("Failed to load products");
      }
    };
    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || p.category === filter)
  );

  return (
    <>
      <Navbarr />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* ✅ Amazon-style Search Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "18px",
            backgroundColor: "#fdd890",
            padding: "8px 20px",
            borderRadius: "4px",
            marginBottom: "24px",
          }}
        >
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: "auto",
              maxHeight: "50px",
              width: "auto",
              maxWidth: "130px",
              objectFit: "contain",
              flexShrink: 0,
              borderRadius: "4px",
            }}
          />

          {/* Category Selector */}
          <Select
            defaultValue=""
            style={{ minWidth: 140 }}
            onChange={(value) => setCategory(value)}
          >
            <Option value="">All Categories</Option>
            <Option value="electronics">Electronics</Option>
            <Option value="fashion">Fashion</Option>
            <Option value="books">Books</Option>
            <Option value="home">Home</Option>
            <Option value="other">Other</Option>
          </Select>

          {/* Search Input */}
          <Input
            placeholder="Search for products..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "180px",
            }}
          />
        </div>

        {/* ✅ Hero Banner */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {/* Text Section */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", marginLeft: "32px" }}>
              ONLINE SHOP<span style={{ color: "#ff4081" }}><br />SIMPLE & EASY</span>
            </h2>
            <Paragraph style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "16px", marginLeft: "32px" }}>
              Everything you need, just a click away.<br />Great deals. Great products. Delivered.
            </Paragraph>
            <Button type="primary" size="large" style={{ marginLeft: "72px" }}>
              SHOP NOW
            </Button>
          </div>

          {/* Image Section */}
          <img
            src={EcomImage}
            alt="Hero"
            style={{
              height: "auto",
              maxHeight: "270px",
              width: "100%",
              maxWidth: "480px",
              objectFit: "cover",
              borderRadius: "6px",
              flexShrink: 0,
            }}
          />
        </div>
        {/* ✅ Promo Row */}
        <Row gutter={16} style={{ marginBottom: "30px" }}>
          <Col span={8}>
            <Card variant="borderless" style={{ background: "#fff3e0" }}>
              <Title level={4}>💰 Money Back</Title>
              <Paragraph>30 Days Guarantee</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card variant="borderless" style={{ background: "#e3f2fd" }}>
              <Title level={4}>🚚 Free Shipping</Title>
              <Paragraph>Orders over $99</Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card variant="borderless" style={{ background: "#fce4ec" }}>
              <Title level={4}>🔥 Special Sale</Title>
              <Paragraph>Extra 5% off on all items</Paragraph>
            </Card>
          </Col>
        </Row>

        {/* ✅ Filter Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <Title level={3}>New Products</Title>
          <Space.Compact>
            <Button type={filter === "all" ? "primary" : "default"} onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              type={filter === "fashion" ? "primary" : "default"}
              onClick={() => setFilter("fashion")}
            >
              Fashion
            </Button>
            <Button
              type={filter === "electronics" ? "primary" : "default"}
              onClick={() => setFilter("electronics")}
            >
              Electronics
            </Button>
            <Button
              type={filter === "books" ? "primary" : "default"}
              onClick={() => setFilter("books")}
            >
              Books
            </Button>

          </Space.Compact>
        </div>

        {/* ✅ Product Grid */}
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.title}
                    src={product.imageURL}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
              >
                <h3>{product.title}</h3>
                <p style={{ color: "#4caf50", fontWeight: "bold" }}>${product.price}</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <Link to={`/product/${product._id}`}>View</Link>
                </div>

              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
