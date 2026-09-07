# Vardha Warehousing

A full-stack warehouse booking and management platform for Vardha Warehousing. Customers can explore warehouse facilities, calculate requirements, submit enquiries, and make payments. Admins can manage products, clients, FAQs, contacts, and pricing.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

### Customer-Facing
- Homepage with hero, stats, solutions, use cases, clients, FAQ, and location sections
- Facility gallery and operational advantages
- Solutions and use cases pages
- Clients showcase
- Contact form with form validation
- Book warehouse space multi-step enquiry flow
- Warehouse space calculator
- Demo payment flow with success page
- WhatsApp integration for quick enquiries
- Responsive design for mobile, tablet, and desktop

### Admin Dashboard
- Dashboard overview with statistics
- Product management (CRUD)
- Category management
- Client management
- Enquiry management
- FAQ management
- Contact management
- Pricing management
- Admin profile management
- Admin authentication (login/logout)

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Lucide React
- React Helmet Async
- Axios
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB / Mongoose
- JWT Authentication
- Multer (file uploads)
- Bcryptjs
- Cors
- Dotenv

## Project Structure

```
Bricks Updated/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── Components/
    │   ├── Components/header.jsx
    │   ├── Components/footer.jsx
    │   ├── Components/Calculator.jsx
    │   ├── Components/WhatsAppButton.jsx
    │   ├── Components/FloatingWhatsApp.jsx
    │   ├── Components/ScrollToTop.jsx
    │   ├── Components/SEO.jsx
    │   ├── Components/ProtectedRoute.jsx
    │   ├── data/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies
3. Install frontend dependencies
4. Configure environment variables
5. Start backend server
6. Start frontend dev server

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm start` or `npm run dev` - Start server

## Routes

### Public Pages
- `/` - Home
- `/about` - About Us
- `/facility` - Facility Gallery
- `/solutions` - Solutions
- `/use-cases` - Use Cases
- `/clients` - Clients
- `/faq` - Frequently Asked Questions
- `/contact` - Contact Us
- `/book-warehouse` - Book Warehouse Space
- `/calculator` - Warehouse Calculator
- `/payment-demo` - Demo Payment
- `/payment-success` - Payment Success

### Admin Pages
- `/admin-login` - Admin Login
- `/admin-dashboard` - Dashboard
- `/admin-dashboard/products` - Products
- `/admin-dashboard/categories` - Categories
- `/admin-dashboard/clients` - Clients
- `/admin-dashboard/enquiries` - Enquiries
- `/admin-dashboard/faqs` - FAQ Management
- `/admin-dashboard/contacts` - Contacts
- `/admin-dashboard/pricing` - Pricing
- `/admin-dashboard/profile` - Profile

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.
