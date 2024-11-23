"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../../components/ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Centralized Heading */}
      <h1
        className="relative z-10 
             text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
             font-bold 
             bg-clip-text text-transparent 
             bg-gradient-to-b from-neutral-200 to-neutral-600 
             text-center leading-snug md:leading-normal"
      >
        Benefits
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* First Wobble Card */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-blue-800 min-h-[400px]"
          className="flex items-center justify-between"
        >
          <div className="max-w-md">
            <h2 className="text-left text-xl md:text-3xl lg:text-5xl font-semibold text-white">
              Centralized Progress Tracking
            </h2>
            <p className="mt-4 text-left text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed">
              Keep track of your coding journey across multiple platforms in one place. Analyze your submissions, contest history, and overall performance.
            </p>
          </div>
          <Image
            src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1731655113/ckrtbfb7g09hbgmfz5lc8e5i1-event-tracking-fm_dear8b.svg"
            width={300}
            height={300}
            alt="Progress Tracking"
            className="object-contain rounded-2xl w-48 h-48 lg:w-64 lg:h-64"
          />
        </WobbleCard>

        {/* Second Wobble Card */}
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-purple-800 flex items-center">
          <div className="flex flex-col items-start">
            <h2 className="text-left text-xl md:text-3xl lg:text-5xl font-semibold text-white">
              Performance Analysis and Insights
            </h2>
            <p className="mt-4 text-left text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed">
              Discover your strengths and weaknesses with detailed analytics.
              Compare coding habits over time to improve consistency and
              productivity.
            </p>
          </div>
          <Image
            src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1732169929/analysis-concept-illustration_114360-1119_ljcybd.jpg"
            width={300}
            height={300}
            alt="Performance Analysis"
            className="object-contain rounded-2xl w-48 h-48 lg:w-64 lg:h-64"
          />
        </WobbleCard>

        {/* Third Wobble Card */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-green-900 min-h-[400px] flex">
          {/* Left Half: Content Section */}
          <div className="flex-1 flex flex-col justify-center p-6">
            <h2 className="text-left text-xl md:text-3xl lg:text-5xl font-semibold text-white">
              Goal Setting and Achievement Tracking
            </h2>
            <p className="mt-4 text-left text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed">
              Set milestones and track progress towards your goals. Stay motivated with personalized recommendations and visualized achievements.
            </p>
          </div>

          {/* Right Half: Image Section */}
          <div className="flex-1 flex justify-center items-center p-6">
            <Image
              src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1732170023/people-run-to-their-goal-on-the-column-of-columns-move-up-motivation-the-path-to-the-target-s-achievement-flat-design-modern-illustration-vector_ibwdz0.jpg"
              width={400}
              height={400}
              alt="Achievements"
              className="object-contain rounded-2xl max-w-full"
            />
          </div>
        </WobbleCard>
      </div>
    </div>
  );
}
