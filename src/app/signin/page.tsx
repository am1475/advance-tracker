"use client";

import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

export default function SignInPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Get the authentication status
  const [isMounted, setIsMounted] = useState(false);

  // Ensures this only runs on the client side
  useEffect(() => {
    setIsMounted(true);

    // Redirect to /user if already signed in
    if (isSignedIn) {
      router.replace("/user"); // Avoid redirect to /, directly replace with /user
    }
  }, [isSignedIn, router]);

  if (!isMounted) return null; // Prevent rendering until the component is mounted

  return (
    <div className="flex min-h-screen">
      {/* Left Half - Image Section */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dqm8rxpzq/image/upload/v1732350533/63a06f726c26c8dda5deba70_The_20Battle_20of_20Authentication-_20Which_20Type_20Is_20Most_20Secure_ahq4yc.jpg')" }}>
        {/* You can place any overlay here for design effect */}
      </div>

      {/* Right Half - Content Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-black">
        <ClerkProvider>
          {/* Handle signed in and signed out states */}
          <SignedIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Welcome back!</h2>
              <div className="mt-4">
                <UserButton />
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Sign In to TrackX</h2>
              <SignInButton mode="modal">
                <button className="mt-4 bg-black text-white px-6 py-3 rounded shadow-lg border-2 border-transparent hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 ease-in-out">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </ClerkProvider>
      </div>
    </div>
  );
}
