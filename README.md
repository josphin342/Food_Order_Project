# Food Order Project

A full-stack food ordering web application that allows users to browse restaurants, explore menus, add food items to a cart, place orders, make online payments, and manage their profiles.

The application also includes protected routes and role-based access for administrators.

---

## Live Application

### Frontend
https://food-order-project-2.onrender.com

### Backend
https://food-order-project-1.onrender.com

---

## Features

### User Features
- User registration
- User login and logout
- Persistent authentication session
- User profile
- Update profile information
- Change password
- Forgot password
- Password reset
- Protected user routes

### Restaurant & Food Features
- Browse restaurants
- Search restaurants
- View restaurant details
- View restaurant menus
- Browse food items
- View food item details
- Restaurant and food images
- Add food items to cart
- Update cart quantities
- Remove items from cart

### Order Features
- Place orders
- View order history
- View individual order details
- Track order status
- View ordered food items
- View delivery information
- View payment information

### Payment
- Online payment using Stripe
- Payment success flow
- Order creation after successful payment

### Admin Features
- Protected admin routes
- View customer orders
- Manage order status
- View order details
- Order filtering and management

---

## Technologies Used

### Frontend
- React
- Vite
- Redux Toolkit
- React Router
- Axios
- Bootstrap
- CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based authentication
- Stripe
- Cloudinary
- Nodemailer / Mailtrap

### Deployment
- Render

---

## Project Structure

```text
food-order-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   └── ...
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
## How to Run Locally
1. Clone the repository
git clone <https://github.com/josphin342/Food_Order_Project>
cd food-order-project

## Backend Setup

Go to the backend directory:
cd backend

Install dependencies:
npm install

Create a .env file based on:
.env.example

Add the required configuration for:
- MongoDB
- JWT authentication
- Cloudinary
- Stripe
- Email service
- frontend URL
- Other backend environment variables used by the application

### Start the backend:
npm run dev
The backend will run on the configured port.

### Frontend Setup
Open another terminal and go to:
cd frontend

Install dependencies:
npm install
Set the API URL to your backend.

Start the frontend:
npm run dev
The frontend will then be available at the Vite development URL.

## Authentication

The application uses JWT-based authentication.

Authentication is maintained using an HTTP-only cookie. Protected API routes verify the JWT before providing access to authenticated resources.

The application also supports:

- Login persistence after page refresh
- Secure logout
- Protected user routes
- Role-based admin authorization

## Image Storage
Restaurant and food item images are stored using Cloudinary.
MongoDB stores the image metadata and image URL rather than storing image files directly in the database.

## Database
The application uses MongoDB with Mongoose for database operations.
Major data models include:

- User
- Restaurant
- FoodItem
- Menu
- Order
- Cart
- Other supporting models

## API

The backend exposes REST APIs for:

- Authentication
- User profile management
- Restaurants
- Menus
- Food items
- Cart
- Orders
- Payments

The backend API is available at:
https://food-order-project-1.onrender.com/api

### Deployment

The application is deployed as separate frontend and backend services on Render.

### Frontend
https://food-order-project-2.onrender.com
### Backend
https://food-order-project-1.onrender.com

Production environment variables are configured through the deployment platform and are not committed to the repository.

## Testing

The following functionality has been tested:

User registration
User login
Login persistence after refresh
Logout
Logout persistence after refresh
Protected routes
Admin authorization
Forgot password
Password reset
Restaurant browsing
Restaurant details
Menu browsing
Food item images
Cart operations
Order creation
Order history
Order details
Stripe payment flow
Admin order management
Production deployment


### License

This project is intended for learning, development, and portfolio purposes.

Author
Josephine A.
