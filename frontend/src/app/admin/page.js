"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Bike,
    Tag,
    FileText,
    Users,
    TrendingUp,
    AlertCircle,
    Plus,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        motorcycles: 0,
        brands: 0,
        posts: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [motorcycles, brands, posts, usersResp] = await Promise.all([
                    api.get('/motorcycles'),
                    api.get('/brands'),
                    api.get('/posts'),
                    api.get('/admin/users')
                ]);
                setStats({
                    motorcycles: motorcycles.length,
                    brands: brands.length,
                    posts: posts.length,
                    users: usersResp.users?.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: "Active Fleet", value: stats.motorcycles, icon: <Bike className="text-primary" />, href: "/admin/motorcycles" },
        { label: "Partner Brands", value: stats.brands, icon: <Tag className="text-primary" />, href: "/admin/brands" },
        { label: "Blog Content", value: stats.posts, icon: <FileText className="text-primary" />, href: "/admin/posts" },
        { label: "Total Members", value: stats.users, icon: <Users className="text-primary" />, href: "/admin/users" },
    ];

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        Command <span className="text-primary not-italic">Center</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Platform Overview & Real-time Metrics</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/motorcycles/new">
                        <Button className="bg-primary text-white hover:bg-primary/90 rounded-none h-12 uppercase font-black px-6">
                            <Plus size={18} className="mr-2" /> Add Machine
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <Link key={index} href={card.href} className="group">
                        <div className="bg-zinc-900 border border-white/5 p-8 space-y-4 hover:border-primary/50 transition-all">
                            <div className="flex justify-between items-start">
                                <div className="h-12 w-12 bg-black flex items-center justify-center border border-white/10 group-hover:border-primary transition-colors">
                                    {card.icon}
                                </div>
                                <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{card.label}</p>
                                <p className="text-4xl font-black text-white italic tracking-tighter">{loading ? "..." : card.value}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
                        <TrendingUp size={20} className="text-primary" /> Active Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/admin/motorcycles" className="p-6 bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors group">
                            <h4 className="font-black uppercase tracking-widest text-white mb-2">Manage Fleet</h4>
                            <p className="text-xs text-zinc-500">Add, edit, or remove motorcycle models from the public catalog.</p>
                        </Link>
                        <Link href="/admin/brands" className="p-6 bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors group">
                            <h4 className="font-black uppercase tracking-widest text-white mb-2">Partner Network</h4>
                            <p className="text-xs text-zinc-500">Update brand logos, descriptions and visibility on the platform.</p>
                        </Link>
                    </div>
                </div>

                {/* Notifications / Alerts */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
                        <AlertCircle size={20} className="text-primary" /> Notifications
                    </h3>
                    <div className="bg-zinc-900 border border-white/5 p-8 text-center space-y-4">
                        <AlertCircle size={32} className="text-zinc-800 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">No Critical Alerts</p>
                        <p className="text-zinc-600 text-[10px]">Your platform is running smooth at full throttle.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
