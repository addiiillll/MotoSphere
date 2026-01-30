"use client";

import { MessageSquare, Users, Zap, ArrowRight, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForumPage() {
    const stats = [
        { label: "Active Riders", value: "1,240+", icon: <Users className="h-5 w-5" /> },
        { label: "Threads", value: "480", icon: <MessageSquare className="h-5 w-5" /> },
        { label: "Regions", value: "12", icon: <Globe className="h-5 w-5" /> },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-black py-32 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-20" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center md:text-left">
                    <div className="max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                            Community Portal
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                            The <br /> <span className="text-primary not-italic">Hangar</span> Talk
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-xl leading-relaxed">
                            A hub for technical discussions, ride meetups, and mechanical wisdom. Connect with the elite MotoSphere community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Sidebar Layout */}
            <div className="container mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter whitespace-nowrap text-black">Active <span className="text-primary not-italic">Channels</span></h2>
                            <div className="h-1 flex-1 bg-zinc-100" />
                        </div>

                        {/* Channel Placeholders */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Technical Tuning", count: "142 Posts" },
                                { title: "Riding Gear", count: "89 Posts" },
                                { title: "Track Day Debriefs", count: "56 Posts" },
                                { title: "Vintage Restoration", count: "34 Posts" },
                            ].map((channel) => (
                                <div key={channel.title} className="group bg-zinc-50 border border-zinc-100 p-8 hover:border-black transition-all">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black uppercase italic tracking-tight text-black group-hover:text-primary transition-colors">{channel.title}</h3>
                                        <div className="flex justify-between items-center mt-4">
                                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-none">{channel.count}</p>
                                            <ArrowRight size={14} className="text-zinc-200 group-hover:text-black transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-20">
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Recent <span className="text-primary not-italic">Intel</span></h2>
                            <div className="space-y-6">
                                {[
                                    { user: "DucatiDan", msg: "Best chain lube for O-ring chains?", time: "2h ago" },
                                    { user: "MotoGirl_99", msg: "Anyone going to the Leh trip this June?", time: "5h ago" },
                                    { user: "SpeedKing", msg: "RC390 sprocket change results...", time: "1d ago" },
                                ].map((intel, i) => (
                                    <div key={i} className="flex gap-6 items-start p-6 bg-zinc-50 border-l-4 border-zinc-200 hover:border-primary transition-all">
                                        <div className="h-10 w-10 bg-black flex items-center justify-center text-white shrink-0 text-xs font-black italic">
                                            {intel.user[0]}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">{intel.user}</p>
                                            <p className="text-sm font-bold text-black">{intel.msg}</p>
                                            <p className="text-[8px] text-zinc-400 font-bold uppercase">{intel.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Stats Sidebar */}
                        <div className="bg-zinc-950 p-10 text-white border-l-8 border-primary space-y-8">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Current <span className="text-primary not-italic">Pulse</span></h3>
                            <div className="space-y-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex items-center gap-6">
                                        <div className="h-10 w-10 bg-zinc-900 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
                                            <p className="text-xl font-black italic">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none font-black uppercase tracking-widest h-14 transition-all">
                                Request Invite
                            </Button>
                        </div>

                        {/* Community Badge */}
                        <div className="p-10 border-4 border-dashed border-zinc-100 text-center space-y-6">
                            <Shield className="h-12 w-12 text-zinc-200 mx-auto" />
                            <h4 className="text-lg font-black uppercase italic tracking-tighter text-zinc-300">Verified Platform</h4>
                            <p className="text-zinc-400 text-xs font-bold leading-relaxed px-4">
                                Our forum is moderated by certified engineers to ensure the highest quality of technical data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
