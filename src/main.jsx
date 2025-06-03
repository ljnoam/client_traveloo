import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext"; // ✅ AJOUTÉ

const Root = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
