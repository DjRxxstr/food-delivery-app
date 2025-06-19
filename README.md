# Food Delivery App

A modern food delivery application built with React and Firebase Realtime Database. This application allows users to browse food items, add them to the cart, and manage their orders.

## Features

- Browse food items
- Add items to cart
- Remove items from cart
- Place orders via checkout
- Real-time cart synchronization using Firebase
- Responsive design
- Currency formatting

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Structure

```
food-delivery-app/
├── public/            # Static files
├── src/               # React application source code
│   ├── components/    # UI components
│   ├── store/         # Redux slices and actions
│   ├── firebase.js    # Firebase configuration and initialization
│   └── App.jsx        # Main application entry
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-delivery-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
- Enable **Realtime Database**.
- Set the database rules temporarily to allow public access:

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

- Get your Firebase config and update `src/firebase.js`:

```js
// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
```

### 4. Start the App

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

## Development Notes

- Built with React and Redux Toolkit
- Uses Firebase Realtime Database for meals, cart, and order data
- No authentication is used (open database for demo)
- Firebase is used directly through REST API calls

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build

## Deployment

You can deploy this app to **Vercel**, **Netlify**, or **Firebase Hosting**. Just ensure Firebase config is valid and public rules are in place if using without auth.

## License

This project is licensed under the ISC License.