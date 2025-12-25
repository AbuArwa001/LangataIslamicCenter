'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter, useParams } from 'next/navigation';

export default function ProjectForm() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const isNew = id === 'new';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        goal_amount: '',
        start_date: '',
        end_date: '',
        status: 'ongoing',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isNew && id) {
            // Fetch project details
            const fetchProject = async () => {
                try {
                    const res = await fetch(`http://localhost:8000/api/v1/projects/${id}/`);
                    if (res.ok) {
                        const data = await res.json();
                        setFormData({
                            name: data.name,
                            description: data.description,
                            goal_amount: data.goal_amount,
                            start_date: data.start_date,
                            end_date: data.end_date || '',
                            status: data.status,
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch project', error);
                }
            };
            fetchProject();
        }
    }, [id, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isNew
            ? 'http://localhost:8000/api/v1/projects/'
            : `http://localhost:8000/api/v1/projects/${id}/`;

        const method = isNew ? 'POST' : 'PUT';

        try {
            // TODO: Add authentication token
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/projects');
            } else {
                alert('Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project', error);
            alert('Error saving project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'New Project' : 'Edit Project'}</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Goal Amount</label>
                            <input
                                type="number"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                value={formData.goal_amount}
                                onChange={(e) => setFormData({ ...formData, goal_amount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="planned">Planned</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
