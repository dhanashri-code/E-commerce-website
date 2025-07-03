import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Upload,
  List,
  Typography,
  Card,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbarr from "../component/Navbarr";

const { Option } = Select;
const { Title } = Typography;

function Admin() {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios.get("https://e-commerce-website-2hpn.onrender.com/api/products").then((res) => setProducts(res.data));
  }, []);

  const handleAdd = async (values) => {
    const token = localStorage.getItem("token");
    const data = { ...values, imageURL: imageUrl };

    try {
      await axios.post("https://e-commerce-website-2hpn.onrender.com/api/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Product added successfully");
      form.resetFields();
      setImageUrl("");
      const updated = await axios.get("https://e-commerce-website-2hpn.onrender.com/api/products");
      setProducts(updated.data);
    } catch (err) {
      message.error("Failed to add product");
      console.error(err);
    }
  };

  const handleImageUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("https://e-commerce-website-2hpn.onrender.com/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageURL);
      message.success("Image uploaded");
    } catch (err) {
      message.error("Upload failed");
    }
  };

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
            title={<Title level={3} style={{ marginBottom: 0 }}>Admin Panel</Title>}
            bordered={false}
            style={{
              backgroundColor: "#e3f2fd",
              border: "1px solid #90caf9",
              borderRadius: "10px",
              marginBottom: "32px",
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAdd}
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              <Form.Item
                name="title"
                label={<strong>Product Title</strong>}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>

              <Form.Item
                name="price"
                label={<strong>Price</strong>}
                rules={[{ required: true }]}
              >
                <InputNumber placeholder="Enter price" className="w-full" min={0} />
              </Form.Item>

              <Form.Item
                name="description"
                label={<strong>Description</strong>}
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item label={<strong>Upload Image</strong>} required>
                <Upload
                  name="image"
                  customRequest={handleImageUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{ marginTop: "10px", height: "80px", borderRadius: "6px" }}
                  />
                )}
              </Form.Item>

              <Form.Item
                name="category"
                label={<strong>Category</strong>}
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a category">
                  <Option value="electronics">Electronics</Option>
                  <Option value="fashion">Fashion</Option>
                  <Option value="books">Books</Option>
                  <Option value="home">Home</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="inStock" valuePropName="checked">
                <Checkbox><strong>In Stock</strong></Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          </Card>
          
            )}
          />
        </div>
      </div>
    </>
  );
}

export default Admin;

