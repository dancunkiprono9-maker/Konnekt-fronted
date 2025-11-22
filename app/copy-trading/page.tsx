'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User, Star, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CopyTradingPage() {
    const [hosts, setHosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchHosts = async () => {
            try {
                const res = await api.get('/copy/hosts');
                setHosts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHosts();
    }, []);

    const handleFollow = async (hostId: number) => {
        try {
            // TODO: Integrate Stripe Payment Element here
            // For now, just call the API which creates a pending subscription
            const res = await api.post('/copy/follow', {
                hostId,
                priceId: 'price_12345' // Placeholder
            });
            alert('Subscription created! Client Secret: ' + res.data.clientSecret);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to follow');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="mb-8">
                <button onClick={() => router.back()} className="text-slate-400 hover:text-white mb-4">
                    &larr; Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Copy Trading
                </h1>
                <p className="text-slate-400 mt-2">Connect with top performing traders</p>
            </header>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hosts.map((host) => (
                        <div key={host.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-blue-500/50 transition group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-slate-800 rounded-full">
                                    <User size={24} className="text-blue-400" />
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1 font-medium">4.9</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-1">{host.email.split('@')[0]}</h3>
                            <p className="text-sm text-slate-500 mb-4">Joined {new Date(host.created_at).toLocaleDateString()}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Win Rate</span>
                                    <span className="text-green-400 font-medium">85%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Monthly Return</span>
                                    <span className="text-green-400 font-medium">+124%</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleFollow(host.id)}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition flex items-center justify-center gap-2"
                            >
                                <Copy size={18} />
                                Copy Trader
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
