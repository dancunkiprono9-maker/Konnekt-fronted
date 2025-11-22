import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    color?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500`}>
                    <Icon size={24} />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                        {trend}
                    </span>
                    <span className="ml-2 text-slate-500">vs last week</span>
                </div>
            )}
        </div>
    );
}
