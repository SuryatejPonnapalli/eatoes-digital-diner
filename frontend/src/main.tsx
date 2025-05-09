import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import MainLayout from "./components/MainLayout.tsx";
import App from "./App.tsx";
import Menu from "./routes/Menu.tsx";
import OrderHistory from "./routes/OrderHistory.tsx";
import CartContextProvider from "./context/CartContextProvider.tsx";
import Checkout from "./routes/Checkout.tsx";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="menu" element={<Menu />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </CartContextProvider>
);
