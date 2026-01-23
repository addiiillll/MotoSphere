"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Users,
    Search,
    Loader2,
    User as UserIcon,
    Shield,
    ShieldAlert,
    Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await api.get('/admin/users');
            setUsers(data.users || []);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        Member <span className="text-primary not-italic">Registry</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Platform Users & Access Control</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
                    <Input
                        placeholder="Search members..."
                        className="bg-zinc-900 border-zinc-800 text-white rounded-none pl-9 h-12 focus:border-primary font-bold transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Scanning neural bridge...</p>
                    </div>
                ) : filteredUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black border-b border-white/10">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Identify</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Contact</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Authority</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Joined</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-black border border-zinc-800 flex items-center justify-center group-hover:border-primary transition-colors">
                                                    <UserIcon size={18} className="text-zinc-600" />
                                                </div>
                                                <p className="font-black uppercase text-white italic">{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs text-zinc-400 font-bold">{user.email}</td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'admin' ? (
                                                    <span className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest">
                                                        <ShieldAlert size={12} /> Root
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-black uppercase tracking-widest">
                                                        <Shield size={12} /> Member
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">
                                            <Calendar size={12} /> {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <span className="inline-block h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <Users className="h-12 w-12 text-zinc-800 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">No members matching search</p>
                    </div>
                )}
            </div>
        </div>
    );
}
