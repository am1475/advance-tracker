"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for navigation
import { AuroraBackground } from "../../components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  const router = useRouter(); // Using useRouter from next/navigation
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Ensures the code only runs on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents rendering before the component is mounted

  const handleGetStartedClick = () => {
    setIsLoading(true); // Set loading to true
    // Simulate loading for a moment before navigation
    setTimeout(() => {
      router.push("/signin"); // Navigate to the sign-in page
    }, 1000); // Adjust delay if needed
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Welcome to TrackX.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Track your progress, stay ahead.
        </div>
        <button
          className={`bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleGetStartedClick}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Loading..." : "Get Started"}
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
