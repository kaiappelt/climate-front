import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Index from "./pages/Index/Index";
import { AuthProvider, AuthContext } from "./contexts/auth";

export const Router = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/home" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Private>
                <Index />
              </Private>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
