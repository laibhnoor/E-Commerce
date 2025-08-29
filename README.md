E-Commerce Store

A full-stack e-commerce web application built with React, Tailwind CSS, and Vite on the frontend, and Node.js, Express, MongoDB, and Mongoose on the backend. Users can register, log in, browse products, add items to the cart/wishlist, and place orders.

### Features
User authentication with JWT (signup, login, logout)
Product listing and product details
Cart management (add, remove, update quantity)
Wishlist management
Order creation and order history
Responsive UI built with Tailwind CSS
API error handling and token-based authentication

### Environment Variables

Create a .env file in the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

### Setup Instructions
1. Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Run the development server:
npm run dev

2. Frontend Setup
Navigate to the frontend folder:
cd client
Install dependencies:
npm install
Start the development server:
npm run dev


### API Endpoints
Auth
POST /api/users/signup → Register a new user
POST /api/users/login → Login user
POST /api/users/logout → Logout user

Products
GET /api/products → Get all products
GET /api/products/:id → Get product by ID

Cart
GET /api/cart → Get user cart
POST /api/cart → Add product to cart
PUT /api/cart/:productId → Update quantity
DELETE /api/cart/:productId → Remove product

Wishlist
GET /api/wishlist → Get user wishlist
POST /api/wishlist → Add product to wishlist
DELETE /api/wishlist → Remove product from wishlist

Orders
GET /api/orders → Get user orders
POST /api/orders → Create new order
