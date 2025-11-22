'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [email, setEmail] = useState('');
    const [derivToken, setDerivToken] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setEmail(user.email);
        }
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            // TODO: Implement backend endpoint to update profile
            // await api.put('/user/profile', { derivToken });
            alert('Profile updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-8">
                <button onClick={() => router.back()} className="text-slate-400 hover:text-white mb-4">
                    &larr; Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Profile Settings
                </h1>
            </header>

            <div className="max-w-2xl bg-slate-900 rounded-xl border border-slate-800 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Deriv API Token</label>
                    <input
                        type="password"
                        value={derivToken}
                        onChange={(e) => setDerivToken(e.target.value)}
                        placeholder="Update your API token"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        Enter a new token only if you want to change it.
                    </p>
                </div>

                <div className="pt-6 border-t border-slate-800 flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 font-semibold text-red-400 bg-red-900/20 border border-red-900 rounded-lg hover:bg-red-900/30 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
