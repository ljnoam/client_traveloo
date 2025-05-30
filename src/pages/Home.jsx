import React from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/layout/Navbar";
import GlobalBackground from "../components/layout/GlobalBackground";

import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import WhySection from "../components/home/WhySection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FinalCTASection from "../components/home/FinalCTASection";
import FeedbackCard from "../components/home/FeedbackCard"; // ✅ Ajout FeedbackCard
import Footer from "../components/layout/Footer"; // ✅ Ajout Footer

const Home = () => {
  const { darkMode } = useTheme();
  const wrapperText = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${wrapperText}`}>
      <GlobalBackground />
      <Navbar />
      <div className="relative z-10">
        <br /><br />

        <HeroSection />
        <br /><br /><br /><br />

        <HowItWorks />
        <WhySection />
        <TestimonialsSection />
        <FinalCTASection />

        <br />

        {/* Feedback Section */}
        <section className="px-4 py-12 max-w-3xl mx-auto">
          <FeedbackCard />
        </section>

      </div>
    </div>
  );
};

export default Home;
