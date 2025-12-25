"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return null; // Or a loading spinner
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">LIC Admin</h1>
                </div>
                <nav className="mt-6">
                    <Link href="/admin" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
                        Dashboard
                    </Link>
                    <Link href="/admin/projects" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
                        Projects
                    </Link>
                    <Link href="/admin/donations" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
                        Donations
                    </Link>
                    <Link href="/admin/accounts" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary">
                        Accounts
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="md:hidden">
                        {/* Mobile Menu Button (Placeholder) */}
                        <button className="text-gray-600">Menu</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Admin User</span>
                        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
