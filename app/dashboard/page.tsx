'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import StatsCard from '@/components/StatsCard';
import { Wallet, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [trades, setTrades] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/dashboard/stats');
                setStats(statsRes.data);

                const tradesRes = await api.get('/dashboard/trades');
                setTrades(tradesRes.data);
            } catch (err) {
                console.error(err);
                // router.push('/login');
            }
        };
        fetchData();
        // Poll every 5 seconds for updates
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <div className="flex gap-4">
                    <button onClick={() => router.push('/copy-trading')} className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
                        Copy Trading
                    </button>
                    <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition">
                        Deposit
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Account Balance"
                    value={`$${stats.balance.toFixed(2)}`}
                    icon={Wallet}
                    color="blue"
                />
                <StatsCard
                    title="Total Profit"
                    value={`$${stats.totalProfit.toFixed(2)}`}
                    icon={TrendingUp}
                    trend={stats.totalProfit >= 0 ? '+12%' : '-5%'}
                    color="green"
                />
                <StatsCard
                    title="Active Trades"
                    value={trades.filter(t => t.status === 'OPEN').length}
                    icon={Activity}
                    color="purple"
                />
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Recent Trades</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950/50 text-slate-200 uppercase">
                            <tr>
                                <th className="px-6 py-3">Symbol</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Entry Price</th>
                                <th className="px-6 py-3">Profit</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {trades.map((trade) => (
                                <tr key={trade.id} className="hover:bg-slate-800/50 transition">
                                    <td className="px-6 py-4 font-medium text-white">{trade.symbol}</td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center ${trade.trade_type === 'CALL' ? 'text-green-400' : 'text-red-400'}`}>
                                            {trade.trade_type === 'CALL' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                                            {trade.trade_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">${trade.entry_price}</td>
                                    <td className={`px-6 py-4 ${Number(trade.profit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {trade.profit ? `$${trade.profit}` : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${trade.status === 'WON' ? 'bg-green-500/10 text-green-400' :
                                                trade.status === 'LOST' ? 'bg-red-500/10 text-red-400' :
                                                    'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {trade.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
