"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Bike,
    ChevronLeft,
    Star,
    Zap,
    Shield,
    Settings2,
    Fuel,
    Weight,
    Gauge,
    Loader2,
    Calendar
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function MotorcycleDetails({ params }) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const { user } = useAuth();

    const [bike, setBike] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const data = await api.get(`/motorcycles/slug/${slug}`);
                setBike(data);
                // Assuming reviews are fetched separately or populate
                // fetchReviews(data._id);
            } catch (error) {
                console.error("Failed to fetch bike details", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBike();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="animate-spin text-primary h-12 w-12" />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Loading Machine Specs...</p>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="container mx-auto px-6 py-40 text-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Machine Not Found</h2>
                <Link href="/motorcycles">
                    <Button className="mt-8 bg-black hover:bg-primary text-white font-bold uppercase rounded-none px-12 h-14">
                        Back To Fleet
                    </Button>
                </Link>
            </div>
        );
    }

    const specs = [
        { label: "Engine Type", value: bike.specifications?.engineType, icon: <Settings2 className="h-5 w-5" /> },
        { label: "Max Power", value: bike.specifications?.maxPower, icon: <Zap className="h-5 w-5" /> },
        { label: "Max Torque", value: bike.specifications?.maxTorque, icon: <Gauge className="h-5 w-5" /> },
        { label: "Fuel Capacity", value: bike.specifications?.fuelCapacity, icon: <Fuel className="h-5 w-5" /> },
        { label: "Weight", value: bike.specifications?.weight, icon: <Weight className="h-5 w-5" /> },
        { label: "Top Speed", value: bike.specifications?.topSpeed, icon: <Gauge className="h-5 w-5" /> },
    ];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Header / Nav */}
            <div className="container mx-auto px-6 lg:px-12 py-8">
                <Link href="/motorcycles" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors">
                    <ChevronLeft size={14} /> Back to Fleet Search
                </Link>
            </div>

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-[16/10] bg-zinc-100 border border-zinc-200 relative overflow-hidden group">
                            {bike.images?.[activeImage] ? (
                                <img
                                    src={bike.images[activeImage]}
                                    alt={bike.modelName}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Bike className="text-zinc-300 h-32 w-32" />
                                </div>
                            )}
                        </div>
                        {bike.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {bike.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`aspect-square border-2 transition-all overflow-hidden ${activeImage === i ? "border-primary" : "border-zinc-100 opacity-50 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover grayscale active:grayscale-0" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    {bike.brand?.name}
                                </span>
                                <span className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border border-zinc-200">
                                    {bike.type}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-none">
                                {bike.modelName}
                            </h1>
                            <div className="text-3xl font-bold italic text-primary">
                                ${bike.price?.toLocaleString()}
                            </div>
                        </div>

                        <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">
                            {bike.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="h-16 px-12 bg-black text-white hover:bg-primary font-black uppercase rounded-none transition-all text-lg flex-1">
                                Request Quote
                            </Button>
                            <Link href={`/compare?ids=${bike.slug}`}>
                                <Button size="lg" variant="outline" className="h-16 px-10 border-4 border-black text-black hover:bg-black hover:text-white font-black uppercase rounded-none transition-all text-lg">
                                    Compare Specs
                                </Button>
                            </Link>
                        </div>

                        {/* Badges */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-100">
                            <div className="flex items-center gap-3">
                                <Shield className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Warrenty Checked</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Immediate Delivery</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Settings2 className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Service Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications Section */}
                <section className="mt-32">
                    <div className="flex items-center gap-8 mb-16">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter whitespace-nowrap">Technical <span className="text-primary not-italic">Arsenal</span></h2>
                        <div className="h-1 flex-1 bg-zinc-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
                        {specs.map((spec, index) => (
                            <div key={index} className="flex gap-6 group">
                                <div className="h-14 w-14 bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    {spec.icon}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{spec.label}</p>
                                    <p className="text-xl font-black uppercase italic tracking-tight">{spec.value || "Not Specified"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reviews Section Placeholder */}
                <section className="mt-32 bg-zinc-50 p-12 lg:p-20 border border-zinc-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                        <div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Rider <span className="text-primary not-italic">Feedback</span></h2>
                            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Truth straight from the saddle</p>
                        </div>
                        {user ? (
                            <Button className="bg-primary text-white hover:bg-primary/90 font-bold uppercase rounded-none px-8">
                                Write a Review
                            </Button>
                        ) : (
                            <Link href="/auth/login">
                                <Button className="bg-black text-white hover:bg-primary font-bold uppercase rounded-none px-8">
                                    Sign In to Review
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="text-center py-20 border-2 border-dashed border-zinc-200 bg-white">
                        <Star className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">No reviews yet for this machine.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
