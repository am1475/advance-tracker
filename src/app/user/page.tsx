"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input2";
import { UserButton } from "@clerk/nextjs";

const SignupFormDemo = () => {
  const [codeforcesId, setCodeforcesId] = useState("");
  const [leetcodeId, setLeetcodeId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Show loading state
    setIsLoading(true);

    if (!codeforcesId.trim() && !leetcodeId.trim()) {
      setError("Please enter at least one valid user ID.");
      setIsLoading(false); // Reset loading state
      return;
    }

    try {
      // LeetCode Validation
      if (leetcodeId.trim()) {
        const lcResponse = await fetch("/api/leetcode/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                matchedUser(username: "${leetcodeId}") {
                  username
                }
              }
            `,
          }),
        });

        const lcData = await lcResponse.json();

        if (lcData.data?.matchedUser) {
          router.push(`/leetcode?username=${leetcodeId}`);
          return;
        } else {
          setError("LeetCode user not found. Please check the ID.");
        }
      }

      // Codeforces Validation
      if (codeforcesId.trim()) {
        const cfResponse = await fetch(
          `https://codeforces.com/api/user.info?handles=${codeforcesId}`
        );
        const cfData = await cfResponse.json();

        if (cfData.status === "OK") {
          router.push(`/dashboard?user=${codeforcesId}`);
        } else {
          setError("Codeforces user not found. Please check the ID.");
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="max-w-md w-full mx-auto rounded-xl p-6 md:p-8 shadow-lg bg-white dark:bg-gray-800">
        <div className="flex justify-end mb-4">
          <UserButton />
        </div>

        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to Aceternity
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          Login to Aceternity if you can because we don&apos;t have a login flow yet.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="codeforcesId">Codeforces User ID</Label>
            <Input
              id="codeforcesId"
              placeholder="Enter your Codeforces ID"
              value={codeforcesId}
              onChange={(e) => {
                setCodeforcesId(e.target.value);
                setError("");
              }}
              type="text"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="leetcodeId">LeetCode User ID</Label>
            <Input
              id="leetcodeId"
              placeholder="Enter your LeetCode ID"
              value={leetcodeId}
              onChange={(e) => {
                setLeetcodeId(e.target.value);
                setError("");
              }}
              type="text"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-12 font-medium hover:opacity-90 transition duration-300 ease-in-out"
            type="submit"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Loading..." : "Save Details →"}
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default SignupFormDemo;
