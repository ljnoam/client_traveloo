// src/pages/Profile.jsx (ou ProfilePage.jsx)
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import GlobalBackground from "../../components/layout/GlobalBackground";
import Navbar from "../../components/layout/Navbar";
import UserCard from "../../components/profile/UserCard";
import SavedTrips from "../../components/profile/SavedTrips";
import AccountSettings from "../../components/profile/AccountSettings";
import DeleteAccount from "../../components/profile/DeleteAccount";
import { ToastContainer } from "react-toastify";

export default function ProfilePage() {
  const { darkMode } = useTheme();
  const textColor = darkMode ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${textColor}`}>
      <>
        <GlobalBackground />
        <div className="relative z-10 max-w-xl mx-auto px-6 md:px-12 pt-28 space-y-8 pb-10">
          <Navbar />
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <UserCard />
            <SavedTrips />          {/* ← Ici on intègre notre composant SavedTrips */}
            <AccountSettings />
            <DeleteAccount />
          </motion.section>
        </div>
        <ToastContainer position="bottom-center" autoClose={4000} />
      </>
    </div>
  );
}