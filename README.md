# Food Delivery App

A modern food delivery application built with **React**, **Redux**, and **Firebase**. This application allows users to browse food items, manage their cart, and place orders in real-time using Firebase Realtime Database.

## 🔧 Features

- 🥘 Browse dynamic meal listings
- 🛒 Add and remove items from cart
- 💾 Temporary cart data storage in Firebase
- ✅ Order placement and confirmation
- 🌐 Global state management with Redux Toolkit
- 📡 Real-time sync with Firebase Realtime Database
- 📱 Responsive and mobile-friendly design

## 🚀 Tech Stack

- **Frontend**: React (with Vite)
- **State Management**: Redux + Redux Toolkit
- **Backend**: Firebase Realtime Database
- **Authentication**: Anonymous sign-in via Firebase Auth
- **Styling**: Tailwind CSS or plain CSS Modules (based on your project)

## 📁 Project Structure

```
food-delivery-app/
├── src/               # React + Redux application
│   ├── components/    # UI components
│   ├── store/         # Redux slices and actions
│   └── firebase.js    # Firebase initialization
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
4. (Note - If you want proper authentication, enable desired type of authentication)

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