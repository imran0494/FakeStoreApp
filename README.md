# FakeStore App 🛍️

A React Native e-commerce app built with Expo, Redux Toolkit, and React Navigation. Users can browse products, view details, and manage authentication with secure token storage.

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| **Login** | Username/password login with field validation and error handling |
| **Home** | Product grid with search bar and pull-to-refresh |
| **Product Detail** | Full product info — image, title, price, description, rating |

---

## ⚙️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native (Expo) |
| State Management | Redux Toolkit |
| Navigation | React Navigation (Stack) |
| HTTP Client | Axios |
| Token Storage | Expo SecureStore |
| API | Fake Store API |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or above)
- Expo CLI
- Expo Go app on your phone (Android/iOS)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/FakeStoreApp.git

# 2. Navigate to project folder
cd FakeStoreApp

# 3. Install dependencies
npm install

# 4. Start the development server
npx expo start
```

### Running the App

- **Android/iOS (Physical Device):** Scan the QR code with Expo Go app
- **Android Emulator:** Press `a` in the terminal
- **iOS Simulator:** Press `i` in the terminal

---

## 🔐 Test Credentials

```
Username: mor_2314
Password: 83r5^_
```

> These are Fake Store API's default test credentials.

---

## 📁 Folder Structure

```
FakeStoreApp/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js       # Axios setup + request/response interceptors
│   │   ├── authApi.js             # Login API call
│   │   └── productsApi.js        # Fetch products / fetch product by ID
│   │
│   ├── store/
│   │   ├── index.js               # Redux store configuration
│   │   └── slices/
│   │       ├── authSlice.js       # Login, logout, checkAuthStatus
│   │       └── productsSlice.js   # Fetch products, search, selected product
│   │
│   ├── navigation/
│   │   ├── AppNavigator.jsx       # Root navigator — auth guard + token check
│   │   ├── AuthNavigator.jsx      # Login screen stack
│   │   └── MainNavigator.jsx      # Home + Product Detail stack
│   │
│   ├── screens/
│   │   ├── LoginScreen.jsx        # Login UI with validation
│   │   ├── HomeScreen.jsx         # Product grid + search + pull-to-refresh
│   │   └── ProductDetailScreen.jsx # Single product detail view
│   │
│   ├── components/
│   │   └── ProductCard.jsx        # Reusable product card for grid
│   │
│   └── utils/
│       └── tokenStorage.js        # SecureStore save/get/delete helpers
│
├── App.js                         # Entry point — Redux Provider + AppNavigator
├── app.json
└── package.json
```

---

## 🔄 App Flow

```
App Launch
    ↓
checkAuthStatus() — SecureStore mein token check
    ↓
Token found → Home Screen (Products)
Token not found → Login Screen
    ↓
Login → POST /auth/login → Token saved in SecureStore
    ↓
Home Screen → GET /products → Redux state → FlatList grid
    ↓
Product tap → GET /products/:id → Product Detail Screen
    ↓
Logout → Tokens cleared → Back to Login Screen
```

---

## 🔑 Authentication & Token Management

- **Access Token** — Stored securely using `expo-secure-store`. Attached to every API request via Axios request interceptor (`Authorization: Bearer <token>`).
- **Refresh Token** — Also stored in SecureStore. Used to silently obtain a new access token when a `401 Unauthorized` response is received, without logging the user out.
- **Auto Token Refresh** — Implemented via Axios response interceptor. On 401, a new token is fetched automatically and the original request is retried. A `_retry` flag prevents infinite retry loops.
- **Persistent Session** — On app relaunch, token is read from SecureStore so the user doesn't need to login again.

> **Note:** Expo SecureStore is used instead of AsyncStorage for enhanced security. On Android it uses the Android Keystore system, and on iOS it uses the Keychain — both provide hardware-level encryption.

---

## 🔍 Search

- Search is implemented **client-side** on the Redux product list — no additional API calls are made.
- Uses word-boundary matching (`startsWith`) combined with substring matching for queries of 3+ characters.
- Search state is managed in Redux so it persists across re-renders.

```
"men"  → matches "Men's Clothing" ✅, skips "Women's" ✅
"jew"  → matches "Jewellery" ✅
"je"   → matches any word starting with "je" ✅
```

---

## ⚡ Features

- ✅ Login / Logout with form validation
- ✅ Secure token storage (expo-secure-store)
- ✅ Auto token refresh on 401
- ✅ Persistent login session across app restarts
- ✅ Protected routes — unauthenticated users cannot access product screens
- ✅ Product grid (2-column) with image, title, price
- ✅ Product detail screen with rating
- ✅ Search bar with smart word-boundary filtering
- ✅ Pull-to-refresh on product list
- ✅ Loading spinners and error states
- ✅ Retry button on failed API calls
- ✅ Smooth screen transitions

---

## 🛠️ Key Libraries

```json
{
  "expo": "~51.0.0",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "axios": "^1.x",
  "expo-secure-store": "~13.x",
  "react-native-safe-area-context": "^4.x",
  "@expo/vector-icons": "^14.x"
}
```

---

## 🌐 API Reference

**Base URL:** `https://fakestoreapi.com`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | Login and get access token |
| `/products` | GET | Fetch all products |
| `/products/:id` | GET | Fetch single product by ID |

---

## 📝 Notes

- Fake Store API does not provide a dedicated `/auth/refresh` endpoint. Token refresh is simulated by re-calling `/auth/login`. In a production app, a proper refresh token endpoint would be used — only the refresh token would be sent, with no password required.
- Username is persisted in SecureStore to support dynamic token refresh for any logged-in user. Password is never stored — this follows standard security best practices.

---

## 👨‍💻 Author

**Mohammad Imran**  
React Native Developer  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile)
