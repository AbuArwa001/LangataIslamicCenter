"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          setAuthorized(true);
        } else {
          // Token invalid or expired
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/admin/login");
      }
    };

    validateToken();
  }, [router]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Donations", path: "/admin/donations" },
    { name: "Accounts", path: "/admin/accounts" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#00b17b] shadow-xl hidden md:flex flex-col z-20">
        <div className="p-8 flex justify-center items-center border-b border-white/10">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <img src="/logo.png" alt="LIC Logo" className="h-20 w-auto" />
          </div>
        </div>

        <nav className="mt-8 flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="block relative group"
              >
                <motion.div
                  className={`px-6 py-4 rounded-xl transition-all duration-200 flex items-center ${
                    isActive
                      ? "bg-white text-[#00b17b] shadow-md font-bold"
                      : "text-white hover:bg-white/10"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-red-500/10 text-white rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10 md:hidden">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="LIC Logo" className="h-10 w-auto" />
            <span className="font-bold text-gray-700">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
