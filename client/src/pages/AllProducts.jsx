import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Typography,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Navbarr from "../component/Navbarr";

const { Title } = Typography;
const { Option } = Select;

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProducts(res.data);
    } catch (err) {
      message.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Product deleted");
      fetchProducts();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setImageUrl(product.imageURL || "");
    setIsModalOpen(true);
  };

  const handleImageUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:4000/api/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageURL);
      message.success("Image uploaded");
    } catch (err) {
      message.error("Upload failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");

      const updatedData = {
        ...values,
        imageURL: imageUrl,
      };

      await axios.put(`http://localhost:4000/api/products/${editingProduct._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Product updated");
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      message.error("Update failed");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (p) => `$${p}`,
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (val) =>
        val ? (
          <span style={{ color: "green" }}>In Stock</span>
        ) : (
          <span style={{ color: "red" }}>Out of Stock</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => navigate(`/product/${record._id}`)}>
            View
          </Button>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      )
    },
  ];

  return (
    <>
      <Navbarr />
      <div
        style={{
          backgroundColor: "#f4f7fc",
          padding: "30px",
          minHeight: "100vh",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Title level={3}>All Products</Title>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 6 }}
        />

        <Modal
          title="Edit Product"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleUpdate}
          okText="Save"
          width={700}
        >
          {/* 👁 View Section */}
          {editingProduct && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "24px",
                marginBottom: "24px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "20px",
              }}
            >
              <img
                src={imageUrl || editingProduct.imageURL}
                alt={editingProduct.title}
                style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "6px" }}
              />
              <div>
                <Typography.Title level={5}>{editingProduct.title}</Typography.Title>
                <p>
                  <strong>Price:</strong> ${editingProduct.price}
                </p>
                <p>
                  <strong>Category:</strong> {editingProduct.category}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: editingProduct.inStock ? "green" : "red" }}>
                    {editingProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  <strong>Description:</strong><br />
                  {editingProduct.description}
                </p>
              </div>
            </div>
          )}

          {/* ✏️ Edit Form */}
          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select placeholder="Select category">
                <Option value="electronics">Electronics</Option>
                <Option value="fashion">Fashion</Option>
                <Option value="books">Books</Option>
                <Option value="home">Home</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="inStock" label="Stock">
              <Select>
                <Option value={true}>In Stock</Option>
                <Option value={false}>Out of Stock</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Image Upload">
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
          </Form>
        </Modal>

      </div>
    </>
  );
}

export default AllProducts;
