import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import GlobalBackground from "../layout/GlobalBackground";
import Navbar from "../layout/Navbar";
import UserCard from "./UserCard";
import SavedTrips from "./SavedTrips";
import AccountSettings from "./AccountSettings";
import DeleteAccount from "./DeleteAccount";
import { ToastContainer } from "react-toastify";

export default function ProfilePage() {
  const { darkMode } = useTheme();
  const textColor = darkMode ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${textColor}`}>
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
          <SavedTrips />
          <AccountSettings />
          <DeleteAccount />
        </motion.section>
      </div>

      <ToastContainer position="bottom-center" autoClose={4000} />
    </div>
  );
}
