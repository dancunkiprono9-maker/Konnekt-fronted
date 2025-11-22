'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [settings, setSettings] = useState({
        STRIPE_SECRET_KEY: '',
        STRIPE_WEBHOOK_SECRET: '',
        DERIV_APP_ID: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/admin/settings');
                if (res.data) {
                    setSettings(prev => ({ ...prev, ...res.data }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.post('/admin/settings', settings);
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
                <button onClick={() => router.push('/dashboard')} className="text-slate-400 hover:text-white mb-4">
                    &larr; Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                    Admin Settings
                </h1>
                <p className="text-slate-400 mt-2">Manage system keys and configurations</p>
            </header>

            <div className="max-w-2xl bg-slate-900 rounded-xl border border-slate-800 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Stripe Secret Key</label>
                    <input
                        type="password"
                        value={settings.STRIPE_SECRET_KEY}
                        onChange={(e) => setSettings({ ...settings, STRIPE_SECRET_KEY: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white font-mono"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Stripe Webhook Secret</label>
                    <input
                        type="password"
                        value={settings.STRIPE_WEBHOOK_SECRET}
                        onChange={(e) => setSettings({ ...settings, STRIPE_WEBHOOK_SECRET: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white font-mono"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Deriv App ID</label>
                    <input
                        type="text"
                        value={settings.DERIV_APP_ID}
                        onChange={(e) => setSettings({ ...settings, DERIV_APP_ID: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-white font-mono"
                    />
                </div>

                <div className="pt-6 border-t border-slate-800">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save System Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}
