"use client";

import { ShoppingBag, Shield, Clock, ArrowRight, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccessoriesPage() {
    const categories = [
        { name: "Helmets", icon: <Target className="h-6 w-6" />, count: 24, image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80" },
        { name: "Riding Gear", icon: <Shield className="h-6 w-6" />, count: 48, image: "https://images.unsplash.com/photo-1591147551068-16781223e721?auto=format&fit=crop&q=80" },
        { name: "Performance Parts", icon: <Zap className="h-6 w-6" />, count: 15, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80" },
        { name: "Electronics", icon: <Clock className="h-6 w-6" />, count: 12, image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80" },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-zinc-950 py-32 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 grayscale" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl space-y-6">
                        <h4 className="text-primary font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" /> Gear Up
                        </h4>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                            The <span className="text-primary not-italic">Arsenal</span>
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-xl leading-relaxed">
                            Premium accessories and performance gear curated for the modern rider. Engineered for safety, designed for style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Coming Soon / Categories */}
            <div className="container mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat) => (
                        <div key={cat.name} className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
                            <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
                                <div className="h-12 w-12 bg-primary text-white flex items-center justify-center">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{cat.name}</h3>
                                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">{cat.count}+ Products Available Soon</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo Section */}
                <div className="mt-32 bg-zinc-50 border-4 border-black p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <ShoppingBag className="h-16 w-16 text-primary" />
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black">
                            Coming Soon: The <span className="text-primary not-italic">MotoSphere Shop</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                            We are currently finalizing partnerships with top gear manufacturers to bring you an exclusive collection of apparel and parts. Join the club to get notified when the shop drops.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="h-16 px-6 bg-white border-2 border-zinc-200 outline-none focus:border-black font-black uppercase tracking-widest flex-1 max-w-sm"
                            />
                            <Button className="h-16 px-10 bg-black text-white hover:bg-primary rounded-none font-black uppercase tracking-widest transition-all">
                                Notify Me <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 h-full w-48 bg-primary/10 -skew-x-12 translate-x-24" />
                </div>
            </div>
        </div>
    );
}
