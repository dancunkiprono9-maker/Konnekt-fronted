'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function HostPage() {
    const [isHost, setIsHost] = useState(false);
    const [price, setPrice] = useState('50');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setIsHost(user.is_host);
        }
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            // TODO: Implement backend endpoint to update host settings
            // await api.put('/user/host-settings', { isHost, price });

            // Update local storage
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.is_host = isHost;
                localStorage.setItem('user', JSON.stringify(user));
            }

            alert('Settings saved!');
        } catch (err) {
            console.error(err);
            alert('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-8">
                <button onClick={() => router.back()} className="text-slate-400 hover:text-white mb-4">
                    &larr; Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Become a Host
                </h1>
                <p className="text-slate-400 mt-2">Share your trades and earn from subscribers</p>
            </header>

            <div className="max-w-2xl bg-slate-900 rounded-xl border border-slate-800 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-medium text-white">Pro Trader Mode</h3>
                        <p className="text-sm text-slate-400">Allow others to copy your trades</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isHost}
                            onChange={(e) => setIsHost(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {isHost && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Subscription Price ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            />
                        </div>

                        <div className="p-4 bg-blue-900/20 border border-blue-900 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-400 mb-1">Earnings Potential</h4>
                            <p className="text-xs text-slate-400">
                                With a ${price} subscription, 10 followers will earn you ${Number(price) * 10}/month.
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}
