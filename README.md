# 🛍️ Astrape.AI - Full-Stack E-Commerce Platform


**A modern, full-stack e-commerce platform built with React, Node.js, and MongoDB featuring JWT authentication, advanced filtering, and persistent cart functionality.**

[🚀 Live Demo](#) | [📖 Documentation](#features) | [🛠️ Setup Guide](#quick-start)

</div>

---

## 🌟 **Project Overview**

Astrape.AI is a comprehensive e-commerce platform that demonstrates modern full-stack development practices. Built with a focus on user experience, security, and scalability, this project showcases advanced React patterns, RESTful API design, and database optimization techniques.

### **Key Highlights**
- 🔐 **Secure JWT Authentication** with password hashing
- 🛒 **Persistent Shopping Cart** that works for both guests and authenticated users
- 🔍 **Advanced Product Filtering** with real-time search and category filtering
- 📱 **Responsive Design** with modern UI/UX using Tailwind CSS
- 🚀 **RESTful API Architecture** with proper error handling
- 💾 **MongoDB Integration** with optimized queries and data modeling

---

## 🏗️ **Architecture & Tech Stack**

### **Frontend (React)**
- **React 19.1.1** - Latest React with modern hooks and context API
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Context API** - State management for authentication and cart

### **Backend (Node.js)**
- **Express.js 5.1.0** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### **External APIs**
- **DummyJSON API** - Product data and categories for demonstration

---

## ✨ **Features**

### 🔐 **Authentication System**
- **User Registration** with email validation and password strength requirements
- **Secure Login** with JWT token-based authentication
- **Protected Routes** with automatic token validation
- **Password Hashing** using bcryptjs for security
- **Session Management** with persistent login state

### 🛍️ **Product Management**
- **Product Listing** with pagination and infinite scroll
- **Advanced Filtering** by category, price range, and search terms
- **Real-time Search** with instant results
- **Product Categories** with dynamic loading
- **Responsive Product Cards** with hover effects and animations

### 🛒 **Shopping Cart**
- **Guest Cart** - Works without registration using localStorage
- **Authenticated Cart** - Persistent cart stored in database
- **Seamless Transition** - Guest cart merges with user cart on login
- **Quantity Management** - Add, remove, and update item quantities
- **Cart Persistence** - Items remain after logout and browser refresh
- **Order Summary** - Real-time total calculation

### 🎨 **User Interface**
- **Modern Design** with gradient backgrounds and smooth animations
- **Responsive Layout** that works on all device sizes
- **Loading States** with skeleton screens and spinners
- **Error Handling** with user-friendly error messages
- **Accessibility** with proper ARIA labels and keyboard navigation

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Avishkar2004/astrape-ai
   cd astrape-ai
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   npm run dev / npm start (not Recommended)
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   npm start
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/astrape-ai
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env file
   ```

6. **Run the application**

   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📁 **Project Structure**

```
astrape-ai/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Cart.js
│   │   │   ├── Login.js
│   │   │   ├── Navbar.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Register.js
│   │   ├── context/       # React Context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/            # Database models
│   │   └── User.js        # User schema
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── cart.js        # Cart management routes
│   │   └── products.js    # Product routes
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

---

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### **Products**
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories

### **Cart Management**
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update/:productId` - Update item quantity (protected)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear entire cart (protected)

---

## 🎯 **Key Technical Achievements**

### **State Management**
- Implemented React Context API for global state management
- Created separate contexts for authentication and cart functionality
- Handled complex state transitions between guest and authenticated users

### **Security Implementation**
- JWT-based authentication with secure token storage
- Password hashing using bcryptjs with salt rounds
- Protected routes with middleware validation
- CORS configuration for secure cross-origin requests

### **Database Design**
- Optimized MongoDB schema with embedded cart documents
- Efficient querying with proper indexing considerations
- Data validation and sanitization at the model level

### **User Experience**
- Persistent cart functionality across sessions
- Real-time search and filtering without page reloads
- Responsive design with mobile-first approach
- Loading states and error handling for better UX

---

## 🧪 **Testing & Development**

### **Development Scripts**
```bash
# Server development
cd server
npm run dev          # Start with nodemon (auto-restart)

# Client development
cd client
npm start           # Start React development server
npm run build       # Build for production
npm test            # Run tests
```

### **Production Build**
```bash
# Build client for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

---

## 🚀 **Deployment**

### **Environment Variables**
Ensure these environment variables are set in production:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT signing
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to 'production'

### **Recommended Hosting**
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Heroku, Railway, or AWS EC2
- **Database**: MongoDB Atlas (cloud) or self-hosted MongoDB

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Developer**

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 **Acknowledgments**

- [DummyJSON](https://dummyjson.com/) for providing product data
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities for excellent documentation

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and lots of ☕

</div>