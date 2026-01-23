"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2, Bike, X, Plus, ChevronLeft, Zap, Gauge, Settings2, Fuel, Weight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ComparisonContent() {
    const searchParams = useSearchParams();
    const [ids, setIds] = useState([]);
    const [motorcycles, setMotorcycles] = useState([]);
    const [allMotorcycles, setAllMotorcycles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const idList = searchParams.get("ids")?.split(",").filter(id => id) || [];
        setIds(idList);
        fetchComparedMotorcycles(idList);
        fetchAllMotorcycles();
    }, [searchParams]);

    const fetchAllMotorcycles = async () => {
        try {
            const data = await api.get('/motorcycles');
            setAllMotorcycles(data);
        } catch (error) {
            console.error("Failed to fetch all motorcycles", error);
        }
    };

    const fetchComparedMotorcycles = async (idList) => {
        if (idList.length === 0) {
            setMotorcycles([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const bikes = await Promise.all(
                idList.map(id => api.get(`/motorcycles/slug/${id}`).catch(() => null))
            );
            setMotorcycles(bikes.filter(b => b));
        } catch (error) {
            console.error("Failed to fetch compared motorcycles", error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeMotorcycle = (id) => {
        const newIds = ids.filter(i => i !== id);
        const params = new URLSearchParams(searchParams);
        if (newIds.length > 0) {
            params.set("ids", newIds.join(","));
        } else {
            params.delete("ids");
        }
        window.history.pushState({}, "", `?${params.toString()}`);
        setIds(newIds);
        setMotorcycles(motorcycles.filter(m => m.slug !== id));
    };

    const addMotorcycle = (slug) => {
        if (ids.includes(slug)) {
            setIsAdding(false);
            return;
        }
        const newIds = [...ids, slug];
        const params = new URLSearchParams(searchParams);
        params.set("ids", newIds.join(","));
        window.history.pushState({}, "", `?${params.toString()}`);
        setIds(newIds);
        setIsAdding(false);
        fetchComparedMotorcycles(newIds);
    };

    const specKeys = [
        { label: "Price", key: "price", format: (v) => `$${v?.toLocaleString()}` },
        { label: "Engine Type", key: "specifications.engineType" },
        { label: "Displacement", key: "displacement", format: (v) => `${v} CC` },
        { label: "Max Power", key: "specifications.maxPower" },
        { label: "Max Torque", key: "specifications.maxTorque" },
        { label: "Top Speed", key: "specifications.topSpeed" },
        { label: "Fuel Capacity", key: "specifications.fuelCapacity" },
        { label: "Weight", key: "specifications.weight" },
        { label: "Type", key: "type" },
    ];

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return (
        <div className="bg-white min-h-screen pb-32">
            <section className="bg-black py-20 border-b border-primary/20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <Link href="/motorcycles" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors">
                                <ChevronLeft size={14} /> Back to Fleet
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                                Spec <span className="text-primary not-italic">Showdown</span>
                            </h1>
                        </div>
                        {motorcycles.length < 3 && (
                            <Button
                                onClick={() => setIsAdding(true)}
                                className="bg-primary text-white hover:bg-primary/90 rounded-none h-14 px-8 font-black uppercase tracking-widest transition-all"
                            >
                                <Plus className="mr-2 h-5 w-5" /> Add Machine
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12 py-16 overflow-x-auto">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Syncing Engine Data...</p>
                    </div>
                ) : motorcycles.length > 0 ? (
                    <div className="min-w-[800px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="w-1/4 p-6 text-left bg-zinc-50 border-b-4 border-black font-black uppercase italic tracking-tighter text-2xl">Requirement</th>
                                    {motorcycles.map(bike => (
                                        <th key={bike._id} className="p-6 bg-white border-b-4 border-black relative group">
                                            <button
                                                onClick={() => removeMotorcycle(bike.slug)}
                                                className="absolute top-4 right-4 text-zinc-300 hover:text-primary transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                            <div className="space-y-4">
                                                <div className="aspect-video bg-zinc-100 overflow-hidden">
                                                    <img src={bike.images?.[0]} alt={bike.modelName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">{bike.brand?.name}</p>
                                                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-black">{bike.modelName}</h3>
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                    {motorcycles.length < 3 && (
                                        <th className="p-6 bg-zinc-50/50 border-b-4 border-black border-dashed border-2">
                                            <button
                                                onClick={() => setIsAdding(true)}
                                                className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-300 hover:text-primary transition-colors group"
                                            >
                                                <div className="h-16 w-16 border-2 border-dashed border-zinc-200 flex items-center justify-center group-hover:border-primary">
                                                    <Plus size={32} />
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-[0.2em]">Add Alternative</span>
                                            </button>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {specKeys.map((spec, i) => (
                                    <tr key={spec.label} className={i % 2 === 0 ? "bg-zinc-50/50" : "bg-white"}>
                                        <td className="p-6 border-b border-zinc-100 font-black uppercase tracking-widest text-[10px] text-zinc-400">{spec.label}</td>
                                        {motorcycles.map(bike => (
                                            <td key={bike._id} className="p-6 border-b border-zinc-100 font-bold text-black text-sm text-center">
                                                {spec.format ? spec.format(getNestedValue(bike, spec.key)) : (getNestedValue(bike, spec.key) || "—")}
                                            </td>
                                        ))}
                                        {motorcycles.length < 3 && <td className="p-6 border-b border-zinc-100" />}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-40 border-4 border-dashed border-zinc-100">
                        <Bike className="h-16 w-16 text-zinc-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-300">No Machines Selected</h3>
                        <p className="text-zinc-400 text-sm mt-2 font-bold mb-10">Add at least two machines to start a technical showdown.</p>
                        <Button
                            onClick={() => setIsAdding(true)}
                            className="bg-black text-white hover:bg-primary rounded-none h-16 px-12 font-black uppercase tracking-widest"
                        >
                            Select Machines
                        </Button>
                    </div>
                )}
            </div>

            {/* Selection Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-8 border-b-4 border-black flex justify-between items-center bg-zinc-50">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Choose Your <span className="text-primary not-italic">Weapon</span></h2>
                            <button onClick={() => setIsAdding(false)} className="text-zinc-400 hover:text-black"><X size={24} /></button>
                        </div>
                        <div className="overflow-y-auto p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {allMotorcycles.filter(m => !ids.includes(m.slug)).map(bike => (
                                <button
                                    key={bike._id}
                                    onClick={() => addMotorcycle(bike.slug)}
                                    className="group flex gap-4 p-4 border-2 border-zinc-100 hover:border-black transition-all text-left"
                                >
                                    <div className="h-20 w-20 bg-zinc-100 shrink-0 overflow-hidden">
                                        <img src={bike.images?.[0]} alt={bike.modelName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity" />
                                    </div>
                                    <div className="space-y-1 py-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">{bike.brand?.name}</p>
                                        <h4 className="text-base font-black uppercase italic tracking-tight">{bike.modelName}</h4>
                                        <p className="text-xs font-bold text-zinc-400 capitalize">{bike.type}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary lg:h-12 lg:w-12 h-8 w-8" /></div>}>
            <ComparisonContent />
        </Suspense>
    );
}
