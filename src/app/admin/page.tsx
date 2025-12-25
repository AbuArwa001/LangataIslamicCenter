import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Donations</h3>
                    <p className="text-3xl font-bold text-primary mt-2">KES 0.00</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
                    <p className="text-3xl font-bold text-secondary mt-2">0</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Donors</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Donations</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Placeholder Row */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={5}>No recent donations</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
