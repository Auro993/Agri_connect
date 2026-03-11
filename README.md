# 🌾 AgriConnect - Full Stack Agricultural Marketplace

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://agri-connect-ten-olive.vercel.app)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18.x-339933)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479a1)](https://www.mysql.com/)

## 📋 Overview

AgriConnect is a comprehensive full-stack agricultural platform designed to empower farmers with modern digital tools. It connects farmers directly with buyers, provides real-time market intelligence, weather-based farming advice, equipment rental services, and AI-powered crop disease detection.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| **📊 Mandi Price Intelligence** | Real-time wholesale prices from APMC mandis across India with price alerts |
| **🌤️ Weather & Farm Advisor** | Daily farming recommendations based on weather conditions |
| **🚜 Rent Farm Equipment** | Browse, list, and rent tractors, harvesters, and tools from nearby farmers |
| **🤖 AI Crop Doctor** | Upload photos to detect crop diseases instantly with treatment recommendations |
| **🔐 Secure Authentication** | JWT-based user authentication with role-based access (Farmers/Buyers) |
| **📱 Responsive Design** | Mobile-friendly interface that works on all devices |

## 🏗️ Tech Stack

### Frontend
- React.js (Create React App)
- React Router DOM - Navigation and routing
- React Icons - Icon library
- CSS-in-JS - Custom styling with animations

### Backend
- Node.js - Runtime environment
- Express.js - Web framework
- MySQL - Database
- Sequelize ORM - Database modeling
- JWT - Authentication
- bcryptjs - Password hashing

### DevOps & Deployment
- GitHub - Version control
- Vercel - Frontend hosting
- Render - Backend hosting
- Railway - MySQL database hosting

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | https://agri-connect-ten-olive.vercel.app |
| **Backend API** | https://agriconnect-api-60av.onrender.com |
| **API Health** | https://agriconnect-api-60av.onrender.com/health |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**
git clone https://github.com/Auro993/Agri_connect.git
cd Agri_connect

text

2. **Backend Setup**
cd server
npm install

Create .env file with your database credentials
cp .env.example .env

Start backend server
npm run dev

text

3. **Frontend Setup**
cd ../client
npm install

Create .env file for development
echo "REACT_APP_API_URL=http://localhost:5001" > .env

Start frontend
npm start

text

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 🌐 Deployment

### Deploy Backend on Render
1. Create a Render account
2. Create a new Web Service connected to your GitHub repo
3. Set Root Directory to `server`
4. Add environment variables:
NODE_ENV=production
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app

text
5. Click "Deploy" and wait 3-5 minutes

### Deploy Frontend on Vercel
1. Create a Vercel account
2. Import your GitHub repository
3. Set Root Directory to `client`
4. Add environment variable:
REACT_APP_API_URL=https://your-backend.onrender.com

text
5. Click "Deploy"

## 🔧 Environment Variables

### Backend (.env)
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=agri_connect
JWT_SECRET=your-super-secret-key
FRONTEND_URL=http://localhost:3000

text

### Frontend (.env)
REACT_APP_API_URL=http://localhost:5001

text

## 📊 Features in Detail

### 1. Mandi Price Intelligence
- Real-time crop prices from major APMC mandis
- Search by crop, state, and market
- Price trends with up/down indicators
- Set price alerts for target prices
- Filter and sort functionality

### 2. Weather & Farm Advisor
- Current weather conditions
- 5-day weather forecast
- Smart farming recommendations based on weather
- Irrigation scheduling tips
- Crop-specific watering advice

### 3. Rent Farm Equipment
- Browse available equipment by type and location
- Filter by price range
- Equipment details with specifications
- Booking system with date selection
- My Listings dashboard for owners
- Track earnings from rentals

### 4. AI Crop Doctor
- Upload crop photos for disease detection
- AI-powered disease identification
- Detailed symptoms and treatment plans
- Organic and chemical treatment options
- Scan history with status tracking

## 🎨 UI/UX Highlights

- Responsive Design - Works on desktop, tablet, and mobile
- Animations - Smooth transitions and hover effects
- Loading States - Spinners and skeletons
- Error Handling - User-friendly error messages
- Empty States - Helpful placeholders

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aurosmita Sahoo**
- GitHub: @Auro993

## 📞 Contact

- Email: support@agriconnect.com
- Phone: +91 1800-123-4567

---

<div align="center">
Made with ❤️ for Indian Farmers
</div>
