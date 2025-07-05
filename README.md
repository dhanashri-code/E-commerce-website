# 🛒 Full-Stack E-Commerce Website (MERN)

A complete modern e-commerce application built using **MERN Stack**, **Vite**, **Ant Design**, and **MongoDB**.
It includes user authentication, cart management, admin controls, image uploads, and Stripe-ready checkout.

## ✨ Features

### 👤 User
- Register & Login with validation
- View products with filtering & search
- Add to cart, update quantity, remove item
- Place single item orders
- View order history
- User Profile
- Cart persists across sessions

### 🔐 Admin
- Add, update, delete products with image upload
- View all products
- View Recieved order history by User
- Filter by category
- Dashboard view
- Role-based access: only admins see admin options

### 💡 UI/UX
- Modern layout using **Ant Design** components
- Responsive and mobile-friendly
- Real-time feedback with toast messages
- Clean dashboard for admin and users

---

## Admin Access details 
- email - admin@gmail.com
- password - admin123

## ⚙️ Tech Stack

### 🔧 Frontend
- React + Vite
- React Router DOM
- Ant Design (UI)
- Axios

### 🌐 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image uploads)

### 📦 Other
- Cloud Storage via external image URLs (Cloudinary)
- Role-based route protection (admin/user)

---

## 🚀 Deployment

| Part       | Platform  | Link |
|------------|-----------|------|
| Frontend   | Netlify   | `[https://mern-ecom-express.netlify.app/]` |
| Backend    | Render    | `[https://e-commerce-website-2hpn.onrender.com/api/auth/register]` |

## 📂 Folder Structure
````
├── client/           # React frontend
│   └── src/
│       ├── pages/
│       ├── component/
│       ├── context/
│       └── App.jsx
├── server/           # Node/Express backend
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   └── index.js
````

---

## 🛠️ How the Website Works

1. **Users** can register/login
2. **Home page** displays products (search + filter available)
3. **Add to cart** → quantity updated or removed
4. Cart items are saved in `localStorage` and persist after refresh
5. **Order placement** is done per item (single product orders)
6. **Admins** can:

   * Add/edit/delete products with images
   * See all products in a table with modal-based editing
   * Manage stock & category
7. Authenticated users can:

   * View their dashboard
   * Track past orders

---

## 🧪 Running Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/mern-ecommerce.git
   cd mern-ecommerce
   ```

2. **Install dependencies**

   ### Frontend

   ```bash
   cd client
   npm install
   ```

   ### Backend

   ```bash
   cd server
   npm install
   ```

3. **Set environment variables**

   Create a `.env` file in `/server`:

   ```env
   MONGO_URI=your_mongo_db_connection
   JWT_SECRET=your_jwt_secret
   port=
   CLOUDINARY_NAME = 
   CLOUDINARY_API_KEY =
   CLOUDINARY_API_SECRET = 
   ```

4. **Run locally**

   * Backend:

     ```bash
     cd server
     npm run dev
     ```

   * Frontend:

     ```bash
     cd client
     npm run dev
     ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser 🚀

---

## 🧠 Future Improvements

* Stripe or Razorpay integration
* Multi-item checkout
* Admin analytics
* Product reviews & ratings

---

## 👨‍💻 Author

**Dhanashri Bhavsar**
[GitHub](https://github.com/dhanashri-code) | [LinkedIn] [www.linkedin.com/in/dhanashri-bhavsar]

---

> Feel free to ⭐ the repo and contribute!

