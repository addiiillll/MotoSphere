"use client";

import {
    Settings,
    Save,
    Shield,
    Globe,
    Bell,
    Database,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettings() {
    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                    System <span className="text-primary not-italic">Configuration</span>
                </h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Platform Parameters & Security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Nav */}
                <div className="lg:col-span-1 space-y-4">
                    {[
                        { label: "General Settings", icon: <Globe size={18} />, active: true },
                        { label: "Security & Auth", icon: <Lock size={18} /> },
                        { label: "Notifications", icon: <Bell size={18} /> },
                        { label: "Data Management", icon: <Database size={18} /> },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 border font-black uppercase tracking-widest text-xs transition-all ${item.active ? "bg-primary border-primary text-white" : "bg-zinc-900 border-white/5 text-zinc-500 hover:text-white"
                            }`}>
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-zinc-900 border border-white/5 p-8 md:p-12 space-y-10">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white border-b border-white/10 pb-6">General Configuration</h3>

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Platform Title</Label>
                                    <Input defaultValue="MotoSphere" className="bg-black border-zinc-800 text-white rounded-none h-12 focus:border-primary font-bold italic" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact Email</Label>
                                    <Input defaultValue="admin@motosphere.com" className="bg-black border-zinc-800 text-white rounded-none h-12 focus:border-primary font-bold" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-black border border-white/5">
                                <div>
                                    <p className="text-sm font-black uppercase italic text-white">Maintenance Mode</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Disable public access during upgrades</p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between p-6 bg-black border border-white/5">
                                <div>
                                    <p className="text-sm font-black uppercase italic text-white">Public Registration</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Allow new riders to join the platform</p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end">
                                <Button className="bg-primary text-white hover:bg-primary/90 rounded-none h-14 px-12 uppercase font-black tracking-widest">
                                    <Save size={18} className="mr-3" /> Execute Changes
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-950/20 border border-red-900/50 p-8 space-y-4">
                        <div className="flex items-center gap-3 text-red-500">
                            <Shield size={20} />
                            <h4 className="text-xs font-black uppercase tracking-widest">Danger Zone</h4>
                        </div>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed">System-wide resets and destructive actions are locked under multi-factor root authorization.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
