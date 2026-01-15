"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Users,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";

interface Donation {
  id: number;
  amount: number;
  project_id: string;
  donation_date: string;
  status: "completed" | "pending" | "failed";
  is_anonymous: boolean;
  user: string | null;
}

interface DashboardStats {
  total_donations: number;
  active_projects: number;
  total_donors: number;
  recent_donations: Donation[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total_donations: 0,
    active_projects: 0,
    total_donors: 0,
    recent_donations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/stats/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Banknote className="h-24 w-24 text-[#00b17b]" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Banknote className="h-6 w-6 text-[#00b17b]" />
              </div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Total Donations
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-[#00b17b]">
                KES {stats.total_donations.toLocaleString()}
              </h3>
              <div className="flex items-center text-green-600 text-xs font-medium">
                <LinkArrow />
                <span className="ml-1">updated just now</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase className="h-24 w-24 text-[#fbb03b]" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Briefcase className="h-6 w-6 text-[#fbb03b]" />
              </div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Active Projects
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-gray-900">
                {stats.active_projects}
              </h3>
              <div className="flex items-center text-gray-500 text-xs">
                <span>Currently runnning campaigns</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="h-24 w-24 text-blue-500" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Unique Donors
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-extrabold text-gray-900">
                {stats.total_donors}
              </h3>
              <div className="flex items-center text-blue-600 text-xs font-medium">
                <LinkArrow />
                <span className="ml-1">Making a difference</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-400" />
              Recent Donations
            </h2>
            <button className="text-sm text-[#00b17b] font-medium hover:text-[#009f6e] transition-colors">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </td>
                  </tr>
                ) : stats.recent_donations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No recent donations found
                    </td>
                  </tr>
                ) : (
                  stats.recent_donations.map((donation, index) => (
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={donation.id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xs ring-2 ring-white shadow-sm">
                            {donation.is_anonymous
                              ? "A"
                              : donation.user
                              ? "U"
                              : "G"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {donation.is_anonymous
                                ? "Anonymous Donor"
                                : donation.user || "Guest User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {donation.is_anonymous ? "Hidden ID" : "Verified"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">
                          KES {donation.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                           {/* Truncate long project names */}
                          {donation.project_id || "General Fund"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(donation.donation_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={donation.status} />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

const LinkArrow = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    completed: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    failed: "bg-red-100 text-red-700 border-red-200",
  };
  
  const selectedStyle = styles[status as keyof typeof styles] || styles.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'completed' ? 'bg-green-500' : 
        status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
      }`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
