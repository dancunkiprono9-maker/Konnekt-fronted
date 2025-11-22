'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [derivToken, setDerivToken] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signup', { email, password, derivToken, isHost });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800">
                <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Join MirrorBridge
                </h1>

                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300">Deriv API Token</label>
                        <input
                            type="text"
                            value={derivToken}
                            onChange={(e) => setDerivToken(e.target.value)}
                            className="w-full mt-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            placeholder="Paste your API token here"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Don't have an account?{' '}
                            <a href="https://track.deriv.com/_YOUR_AFFILIATE_LINK_" target="_blank" className="text-blue-400 hover:underline">
                                Create one here
                            </a>
                        </p>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isHost"
                            checked={isHost}
                            onChange={(e) => setIsHost(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isHost" className="ml-2 text-sm text-slate-300">
                            I want to be a Pro Trader (Host)
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all transform active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
