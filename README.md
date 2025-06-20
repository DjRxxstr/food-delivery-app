# Food Delivery App

A modern food delivery application built with **React**, **Redux Toolkit**, and **Firebase Realtime Database**. This app allows users to browse meals, manage their cart, and place orders with real-time backend updates.

## 📝 Project Overview

This project demonstrates a full-stack food ordering workflow:
- Users can browse a menu, add/remove items to/from their cart, and proceed through a modal-based checkout process.
- Orders and cart data are synced in real-time with Firebase Realtime Database.
- Robust error handling and loading states are implemented for all network operations.

## 🔑 Key Features

- 🥘 Dynamic meal listing and menu browsing
- 🛒 Add, remove, and update items in a persistent cart
- 💾 Cart and order data stored in Firebase Realtime Database
- ✅ Modal-based checkout with order confirmation and error handling
- 🌐 Global state management using Redux Toolkit
- 📡 Real-time data sync between frontend and backend
- 📱 Responsive and user-friendly UI

## 🚀 Tech Stack

- **Frontend**: React (with Vite)
- **State Management**: Redux Toolkit
- **Backend**: Firebase Realtime Database
- **Styling**: Plain CSS

## 📁 Project Structure

```
food-delivery-app/
├── src/               # React + Redux application
│   ├── components/    # UI components (Cart, Checkout, Menu, etc.)
│   ├── store/         # Redux slices and async actions
│   └── ...
├── public/            # Static files
└── package.json       # Project metadata and scripts
```

## ✅ Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-delivery-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

## 🔐 Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and set up Realtime Database
3. Use the following database rules for development:

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

## 📜 Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Create production build
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint

## 📄 License

This project is licensed under the ISC License.