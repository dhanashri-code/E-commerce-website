import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Typography,
  Image,
  Row,
  Col,
  Spin,
  message,
  InputNumber,
  Button,
} from "antd";
import { useCart } from "../context/CartContext";
import Navbarr from "../component/Navbarr";

const { Title, Paragraph, Text } = Typography;

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        message.error("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    message.success(`${product.title} added to cart`);
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (!product) return null;

  return (
    <>
      <Navbarr />
      <div
        style={{
          backgroundColor: "#f4f7fc",
          padding: "30px",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Card
            bordered
            hoverable
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Image
                  src={product.imageURL}
                  alt={product.title}
                  width="100%"
                  height={400}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  fallback="https://via.placeholder.com/400x400?text=No+Image"
                />
              </Col>
              <Col xs={24} md={12}>
                <Title level={1}>{product.title}</Title>
                <Paragraph>{product.description}</Paragraph> <br />
                <Text strong>Category:</Text> <Text>{product.category}</Text>
                <br />
                <Text strong>Status:</Text>{" "}
                <Text type={product.inStock ? "success" : "danger"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Text>
                <Title level={3} style={{ color: "#000", marginTop: "16px" }}>
                  ${product.price}
                </Title>

                {/* Quantity label and input */}
                <div style={{ marginTop: "16px", marginBottom: "8px" }}>
                  <Text strong>Quantity:</Text>
                  <InputNumber
                    min={1}
                    value={qty}
                    onChange={setQty}
                    style={{ marginLeft: "12px", width: "100px" }}
                  />
                </div>
                <br />
                <Button
                  type="primary"
                  size="large"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Product;
