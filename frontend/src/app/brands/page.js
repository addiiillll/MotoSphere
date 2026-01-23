"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2, Bike, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await api.get('/brands');
                setBrands(data);
            } catch (error) {
                console.error("Failed to fetch brands", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrands();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="bg-black py-24 border-b border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl space-y-6">
                        <h4 className="text-primary font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" /> The Lineup
                        </h4>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                            World Class <span className="text-primary not-italic">Brands</span>
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-xl">
                            The most prestigious manufacturers in the world, all under one roof. Choose your legacy.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12 py-20">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Fetching Manufacturers...</p>
                    </div>
                ) : brands.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {brands.map((brand) => (
                            <div key={brand._id} className="group bg-zinc-50 border border-zinc-100 hover:border-primary transition-all p-12 flex flex-col items-center text-center space-y-8">
                                <div className="h-32 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                                    ) : (
                                        <div className="text-5xl font-black uppercase italic tracking-tighter text-zinc-200 group-hover:text-primary/20 transition-colors">
                                            {brand.name}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
                                        {brand.name}
                                    </h2>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2">
                                        {brand.description || "Leading the industry with precision engineering and legendary performance."}
                                    </p>
                                </div>

                                <Link href={`/motorcycles?brand=${brand._id}`} className="w-full">
                                    <Button className="w-full bg-black text-white hover:bg-primary py-8 rounded-none font-black uppercase tracking-widest transition-all group-hover:translate-y-[-4px]">
                                        View Inventory <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-zinc-50 border-2 border-dashed border-zinc-200">
                        <Bike className="h-16 w-16 text-zinc-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-300">Catalog Loading</h3>
                        <p className="text-zinc-400 text-sm mt-2 font-bold uppercase tracking-widest">Our network of partners is expanding daily.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
