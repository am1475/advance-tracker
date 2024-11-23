"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AreaChart, Area } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';

const LeetCodePage = () => {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        if (!username) {
          setError("No username provided.");
          return;
        }

        const response = await fetch("/api/leetcode/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query {
              matchedUser(username: "${username}") {
                username
                submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }`,
          }),
        });

        const data = await response.json();
        console.log("API Response Data:", data);

        if (data.data?.matchedUser) {
          setStats(data.data.matchedUser);
        } else {
          setError("Unable to fetch stats for the provided username.");
        }
      } catch (err) {
        console.error("Error fetching LeetCode stats:", err);
        setError("An error occurred while fetching stats. Please try again.");
      }
    };

    fetchLeetCodeStats();
  }, [username]);

  // Data for PieChart (distribution of problem-solving difficulty)
  const pieChartData = stats?.submitStatsGlobal?.acSubmissionNum?.map((item: any) => ({
    name: item.difficulty,
    value: item.count || 0,
  }));

  // Data for Histogram (BarChart) showing submissions over time
  const barChartData = [
    { name: 'Jan', submissions: 30 },
    { name: 'Feb', submissions: 40 },
    { name: 'Mar', submissions: 55 },
    { name: 'Apr', submissions: 70 },
    { name: 'May', submissions: 85 },
  ];

  // Line chart data for variations in the number of questions solved (Easy, Medium, Hard)
  const lineChartData = stats?.submitStatsGlobal?.acSubmissionNum?.map((item: any) => ({
    name: item.difficulty,
    easy: item.difficulty === "Easy" ? item.count : 0,
    medium: item.difficulty === "Medium" ? item.count : 0,
    hard: item.difficulty === "Hard" ? item.count : 0,
  }));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar className="w-full md:w-64 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <SidebarHeader>
            <h2 className="text-2xl font-bold p-4">LeetCode Stats</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <a
                href="#problem-stats"
                className="block p-4 hover:bg-purple-700 rounded transition"
              >
                Problem Stats
              </a>
              <a
                href="#total-submissions"
                className="block p-4 hover:bg-purple-700 rounded transition"
              >
                Total Submissions
              </a>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="p-4 text-sm text-white">© 2024 LeetCode Stats</p>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-6">
            LeetCode Stats for {username}
          </h1>
          {error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
              {/* Card 1: Problem Stats */}
              <div className="bg-white dark:bg-gray-100 p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl hover:rotate-1 ease-in-out duration-300">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-black mb-4">
                  Problem Stats
                </h3>
                <div className="space-y-4">
                  {stats.submitStatsGlobal?.acSubmissionNum?.map((item: any) => (
                    <div
                      key={item.difficulty}
                      className="text-neutral-600 dark:text-black"
                    >
                      <p className="text-lg">
                        <strong>{item.difficulty}:</strong> {item.count || "0"} problems solved
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Total Submissions */}
              <div className="bg-white dark:bg-gray-100 p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl hover:rotate-1 ease-in-out duration-300">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-black mb-4">
                  Total Submissions
                </h3>
                <p className="text-lg text-neutral-600 dark:text-black">
                  <strong>Across All Difficulties:</strong> {stats.submitStatsGlobal?.acSubmissionNum?.reduce(
                    (total: number, item: any) => total + (item.count || 0),
                    0
                  )} submissions
                </p>
              </div>

              {/* Card 3: Variations in Problems Solved (Line Chart) */}
              <div className="bg-white dark:bg-gray-100 p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl hover:rotate-1 ease-in-out duration-300">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-black mb-4">
                  Variations in Problems Solved (Easy, Medium, Hard)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="easy" stroke="#4CAF50" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="medium" stroke="#FFC107" />
                    <Line type="monotone" dataKey="hard" stroke="#F44336" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Card 4: Submissions Over Time (Area Chart) */}
              <div className="bg-white dark:bg-gray-100 p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl hover:rotate-1 ease-in-out duration-300">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-black mb-4">
                  Submissions Over Time
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="submissions" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Card 5: Difficulty Distribution (Pie Chart) */}
              <div className="bg-white dark:bg-gray-100 p-8 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl hover:rotate-1 ease-in-out duration-300">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-black mb-4">
                  Difficulty Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#4CAF50', '#FFC107', '#F44336'][index % 3]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <p className="mt-4">Loading...</p>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LeetCodePage;
