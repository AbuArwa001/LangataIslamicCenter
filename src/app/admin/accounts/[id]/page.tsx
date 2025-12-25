'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter, useParams } from 'next/navigation';

export default function AccountForm() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const isNew = id === 'new';

    const [formData, setFormData] = useState({
        name: '',
        account_type: 'paybill',
        details: '{}', // Stringified JSON for editing
        is_active: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isNew && id) {
            const fetchAccount = async () => {
                try {
                    const res = await fetch(`http://localhost:8000/api/v1/donations/accounts/${id}/`);
                    if (res.ok) {
                        const data = await res.json();
                        setFormData({
                            name: data.name,
                            account_type: data.account_type,
                            details: JSON.stringify(data.details, null, 2),
                            is_active: data.is_active,
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch account', error);
                }
            };
            fetchAccount();
        }
    }, [id, isNew]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isNew
            ? 'http://localhost:8000/api/v1/donations/accounts/'
            : `http://localhost:8000/api/v1/donations/accounts/${id}/`;

        const method = isNew ? 'POST' : 'PUT';

        try {
            let parsedDetails = {};
            try {
                parsedDetails = JSON.parse(formData.details);
            } catch (e) {
                alert('Invalid JSON in details');
                setLoading(false);
                return;
            }

            const payload = {
                ...formData,
                details: parsedDetails,
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin/accounts');
            } else {
                alert('Failed to save account');
            }
        } catch (error) {
            console.error('Error saving account', error);
            alert('Error saving account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{isNew ? 'New Account' : 'Edit Account'}</h1>

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
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                            value={formData.account_type}
                            onChange={(e) => setFormData({ ...formData, account_type: e.target.value })}
                        >
                            <option value="paybill">Paybill</option>
                            <option value="paypal">PayPal</option>
                            <option value="card">Card</option>
                            <option value="bank">Bank Transfer</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details (JSON)</label>
                        <p className="text-xs text-gray-500 mb-1">Enter details like business number, account number, etc.</p>
                        <textarea
                            required
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border font-mono"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            checked={formData.is_active}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        />
                        <label className="ml-2 block text-sm text-gray-900">Active</label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Account'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
