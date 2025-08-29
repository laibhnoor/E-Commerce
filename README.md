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

<img width="1598" height="853" alt="image" src="https://github.com/user-attachments/assets/606ee92e-9bc7-44c4-b45c-7a18390816d0" />
<img width="1599" height="794" alt="image" src="https://github.com/user-attachments/assets/1aa307f5-4e33-4d8d-a6ea-79a3f6b0fd0c" />
<img width="1597" height="826" alt="image" src="https://github.com/user-attachments/assets/3d265fb6-4f37-4035-9c69-e6907bb2495b" />
<img width="1600" height="799" alt="image" src="https://github.com/user-attachments/assets/17e51587-29c2-4c97-ac50-90fbc1d92248" />
<img width="1600" height="807" alt="image" src="https://github.com/user-attachments/assets/be7684f2-cd76-48be-a18e-6527b1f2f511" />





