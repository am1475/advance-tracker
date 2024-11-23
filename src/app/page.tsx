"use client";


import { SpotlightPreview } from "./components/SpotlightPreview";
import { HoverBorderGradientDemo } from "./components/HoverBorderGradientDemo"; // Adjust path if necessary
import { WobbleCardDemo } from "./components/WobbleCardDemo";
import { AuroraBackgroundDemo } from "./components/AuroraBackgroundDemo";
import { FeaturesSectionDemo } from "./components/FeaturesSectionDemo";
import { AnimatedTestimonialsDemo } from "./components/AnimatedTestimonials";
import { FloatingDockDemo } from "./components/FloatingDockDemo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Include the Navbar */}
    
      <AuroraBackgroundDemo />
    
  
      <WobbleCardDemo />
      <FeaturesSectionDemo />
      <AnimatedTestimonialsDemo />
      <FloatingDockDemo />
    </div>
  );
}
