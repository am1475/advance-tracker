"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure this is imported correctly
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input2";



export function SignupFormDemo() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form's default submission behavior
    console.log("Form submitted with userId:", userId); // Debug log

    if (!userId.trim()) {
      setError("Please enter a valid Codeforces user ID.");
      console.log("Error: No user ID entered");
      return;
    }

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${userId}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Debug log for API response

      if (data.status === "OK") {
        console.log("Redirecting to dashboard...");
        router.push(`/dashboard?user=${userId}`); // Navigate to the dashboard
      } else {
        setError("User not found. Please check the Codeforces ID.");
      }
    } catch (err) {
      console.error("API Error:", err); // Log error
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="codeforcesId">Codeforces User ID</Label>
          <Input
            id="codeforcesId"
            placeholder="Enter your Codeforces ID"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError("");
            }}
            type="text"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Save Details &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
