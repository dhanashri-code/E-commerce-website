import React, { useState } from "react";
import {
  Card,
  InputNumber,
  Button,
  Typography,
  message,
  Modal,
  Row,
  Col,
  Empty,
} from "antd";
import { useCart } from "../context/CartContext";
import Navbarr from "../component/Navbarr";
import axios from "axios";

const { Title } = Typography;

function Cart() {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const showClearCartModal = () => {
    setIsModalOpen(true);
  };

  const handleClearCart = () => {
    setCart([]);
    setIsModalOpen(false);
    message.success("Cart has been cleared");
  };

  const handlePlaceSingleItem = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please login to place your order");
      return;
    }

    const orderData = {
      items: [{ productId: item._id, quantity: item.quantity }],
      total: item.price * item.quantity,
    };

    try {
      await axios.post("https://e-commerce-website-2hpn.onrender.com/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success(`Order placed: ${item.title}`);
    } catch (err) {
      message.error("Failed to place order");
      console.error(err);
    }
  };

  return (
    <>
      <Navbarr />
      <div
        style={{
          padding: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "#f4f7fc",
          minHeight: "100vh",
          borderRadius: "8px",
        }}
      >
        <Title level={2} style={{ marginBottom: "24px" }}>
          Your Cart
        </Title>

        {cart.length === 0 ? (
          <Empty description="Your cart is empty." />
        ) : (
          <Row gutter={[16, 16]}>
            {cart.map((item) => (
              <Col xs={24} sm={24} md={12} lg={12} key={item._id}>
                <Card
                  title={item.title}
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    border: "1px solidrgb(232, 224, 201)",
                  }}
                  actions={[
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(val) => updateQuantity(item._id, val)}
                    />,
                    <Button
                      type="primary"
                      onClick={() => handlePlaceSingleItem(item)}
                    >
                      Place Order
                    </Button>,
                    <Button danger onClick={() => removeFromCart(item._id)}>
                      Remove
                    </Button>,
                  ]}
                >
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Total and Clear Cart */}
        {cart.length > 0 && (
          <div style={{ marginTop: "32px", textAlign: "right" }}>
            <Title level={4} style={{ color: "#2e7d32" }}>
              Total Cart Value: ${total.toFixed(2)}
            </Title>

            <Button
              danger
              onClick={showClearCartModal}
              style={{ marginTop: "10px", backgroundColor: "#fddede", borderColor: "#ff6b6b" }}
            >
              Clear Cart
            </Button>

            <Modal
              title="Confirm Clear Cart"
              open={isModalOpen}
              onOk={handleClearCart}
              onCancel={() => setIsModalOpen(false)}
              okText="Yes, clear it"
              cancelText="Cancel"
            >
              <p>Are you sure you want to remove all items from your cart?</p>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
