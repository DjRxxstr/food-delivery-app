# Food Delivery App

A modern food delivery application built with React and Express.js. This application allows users to browse food items, add them to cart, and manage their orders.

## Features

- Browse food items
- Add items to cart
- Remove items from cart
- Real-time cart synchronization
- Responsive design
- Currency formatting

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Structure

```
food-delivery-app/
├── src/               # Frontend React application
├── backend/           # Express.js backend server
├── public/           # Static files
└── package.json      # Frontend dependencies
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-delivery-app
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start running on `http://localhost:3000`

### 5. Start the Frontend Development Server

In a new terminal window, from the root directory:

```bash
npm run dev
```

The frontend application will start running on `http://localhost:5173`

## Development

- Frontend is built with React and uses Vite as the build tool
- Backend is built with Express.js
- Cart data is synchronized between frontend and backend
- The application uses modern React features including Context API and Hooks

## Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm start` - Start the backend server

## API Endpoints

The backend provides the following endpoints:
- `GET /temp-cart` - Fetch cart data
- `POST /temp-cart` - Update cart data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
