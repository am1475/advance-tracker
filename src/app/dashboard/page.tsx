"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  
} from "recharts";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface UserData {
  handle: string;
  avatar: string;
  rank: string;
  rating: number;
  maxRating: number;
}

interface SubmissionData {
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating: number;
  };
  verdict: string;
}

interface ContestRating {
  contestName: string;
  rank: number;
  newRating: number;
}

export function AppSidebar() {
  return (
    <Sidebar className="w-full md:w-64 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <SidebarHeader>
        <h2 className="text-2xl font-bold p-4">Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <a
            href="/"
            className="block p-4 hover:bg-purple-700 rounded transition"
          >
            Home
          </a>
          <a
            href="/user-details"
            className="block p-4 hover:bg-purple-700 rounded transition"
          >
            User Details
          </a>
          <a
            href="/statistics"
            className="block p-4 hover:bg-purple-700 rounded transition"
          >
            Statistics
          </a>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="p-4 text-sm text-white">© 2024 Dashboard App</p>
      </SidebarFooter>
    </Sidebar>
  );
}

const Dashboard = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [solvedQuestions, setSolvedQuestions] = useState<
    { contestId: number; index: string; name: string; rating: number }[]
  >([]);
  const [contestRatings, setContestRatings] = useState<ContestRating[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserData(user);
      fetchSolvedQuestions(user);
      fetchContestRatings(user);
    }
  }, [user]);

  const fetchUserData = async (handle: string) => {
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setUserData(data.result[0]);
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchSolvedQuestions = async (handle: string) => {
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const solvedProblems = data.result
          .filter(
            (submission: SubmissionData) =>
              submission.verdict === "OK" && submission.problem.rating
          )
          .map((submission: SubmissionData) => ({
            contestId: submission.problem.contestId,
            index: submission.problem.index,
            name: submission.problem.name,
            rating: submission.problem.rating,
          }));
        setSolvedQuestions(solvedProblems);
      } else {
        console.error("Error fetching solved problems");
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const fetchContestRatings = async (handle: string) => {
    try {
      const response = await fetch(
        `https://codeforces.com/api/user.rating?handle=${handle}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const ratings = data.result.map((contest: ContestRating) => ({
          contestName: contest.contestName,
          rank: contest.rank,
          newRating: contest.newRating,
        }));
        setContestRatings(ratings);
      } else {
        console.error("Error fetching contest ratings");
      }
    } catch (err) {
      console.error("Error fetching contest ratings:", err);
    }
  };

  const categorizeQuestions = (questions: { rating: number }[]) => {
    let easy = 0;
    let medium = 0;
    let hard = 0;

    questions.forEach((question) => {
      if (question.rating < 1200) {
        easy++;
      } else if (question.rating >= 1200 && question.rating <= 1800) {
        medium++;
      } else {
        hard++;
      }
    });

    return [
      { name: "Easy", value: easy },
      { name: "Medium", value: medium },
      { name: "Hard", value: hard },
    ];
  };

  const pieChartData = categorizeQuestions(solvedQuestions);

  const top20Questions = solvedQuestions
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 20);

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            User Dashboard
          </h1>
          {userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* User Details */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <img
                  src={userData.avatar}
                  alt={`${userData.handle}'s Avatar`}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold text-black">{userData.handle}</h2>
                <p>Rank: {userData.rank}</p>
                <p>Rating: {userData.rating}</p>
                <p>Max Rating: {userData.maxRating}</p>
              </div>

              {/* Contest Ratings Line Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <h3 className="text-xl font-bold mb-4">Contest Ratings</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={contestRatings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="contestName" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newRating"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Solved Questions Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <h3 className="text-xl font-bold mb-4">
                  Solved Questions Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
  <h3 className="text-xl font-bold mb-4">Solved Questions Bar Chart</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={pieChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
</div>

              {/* Top 20 Solved Questions */}
              <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-black">Top 20 Solved Questions</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {top20Questions.map((question, index) => (
                    <li key={index} className="text-gray-700">
                      <a
                        href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        <strong>{question.name}</strong> - Rating:{" "}
                        {question.rating}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
