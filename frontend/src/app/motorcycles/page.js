"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Bike,
    Search,
    SlidersHorizontal,
    ChevronRight,
    Loader2,
    X
} from "lucide-react";
import Link from "next/link";

export default function MotorcyclesListing() {
    const [motorcycles, setMotorcycles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters State
    const [filters, setFilters] = useState({
        brand: "",
        type: "",
        minPrice: "",
        maxPrice: "",
        search: ""
    });

    const types = ["Sport", "Cruiser", "Adventure", "Touring", "Naked", "Off-road", "Scooter"];

    useEffect(() => {
        fetchBrands();
        fetchMotorcycles();
    }, []);

    const fetchBrands = async () => {
        try {
            const data = await api.get('/brands');
            setBrands(data);
        } catch (error) {
            console.error("Failed to fetch brands", error);
        }
    };

    const fetchMotorcycles = async (currentFilters = filters) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            if (currentFilters.brand) query.append("brand", currentFilters.brand);
            if (currentFilters.type) query.append("type", currentFilters.type);
            if (currentFilters.minPrice) query.append("minPrice", currentFilters.minPrice);
            if (currentFilters.maxPrice) query.append("maxPrice", currentFilters.maxPrice);

            const data = await api.get(`/motorcycles?${query.toString()}`);
            setMotorcycles(data);
        } catch (error) {
            console.error("Failed to fetch motorcycles", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        // Debounce or trigger fetch if it's a select/checkbox
        if (key !== 'search' && key !== 'minPrice' && key !== 'maxPrice') {
            fetchMotorcycles(newFilters);
        }
    };

    const applyFilters = () => {
        fetchMotorcycles();
    };

    const clearFilters = () => {
        const defaultFilters = {
            brand: "",
            type: "",
            minPrice: "",
            maxPrice: "",
            search: ""
        };
        setFilters(defaultFilters);
        fetchMotorcycles(defaultFilters);
    };

    // Local filtering for search (if backend doesn't support search yet)
    const filteredMotorcycles = motorcycles.filter(bike =>
        bike.modelName.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <section className="bg-black py-24 border-b border-white/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <h4 className="text-primary font-black uppercase tracking-widest">The Fleet</h4>
                            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                                Discover Your <br /> <span className="text-primary not-italic">Engine</span>
                            </h1>
                        </div>
                        <div className="max-w-md w-full relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />
                            <Input
                                placeholder="Search models..."
                                className="bg-zinc-900 border-zinc-800 text-white rounded-none h-16 pl-12 focus:border-primary transition-all text-lg font-bold italic"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-80 space-y-10">
                        <div className="flex items-center justify-between pb-4 border-b-4 border-black">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                                <SlidersHorizontal className="h-6 w-6 text-primary" /> Filters
                            </h3>
                            <button
                                onClick={clearFilters}
                                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors flex items-center gap-1"
                            >
                                Clear All <X size={12} />
                            </button>
                        </div>

                        {/* Brand Filter */}
                        <div className="space-y-4">
                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">Select Brand</Label>
                            <select
                                className="w-full text-black bg-zinc-50 border-2 border-zinc-200 h-12 px-4 font-bold appearance-none focus:border-primary outline-none transition-all uppercase text-sm"
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                            >
                                <option value="">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div className="space-y-4">
                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">Motorcycle Type</Label>
                            <div className="flex flex-wrap gap-2">
                                {types.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleFilterChange('type', filters.type === type ? "" : type)}
                                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${filters.type === type
                                                ? "bg-primary border-primary text-white"
                                                : "bg-white border-zinc-200 text-zinc-500 hover:border-black hover:text-black"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-4">
                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-500">Price Range ($)</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="Min"
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="rounded-none border-2 border-zinc-200 font-bold focus:border-black"
                                />
                                <Input
                                    placeholder="Max"
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="rounded-none border-2 border-zinc-200 font-bold focus:border-black"
                                />
                            </div>
                            <Button
                                onClick={applyFilters}
                                className="w-full bg-black text-white hover:bg-primary h-12 rounded-none font-black uppercase tracking-widest mt-2"
                            >
                                Apply Range
                            </Button>
                        </div>
                    </aside>

                    {/* Listing Grid */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="animate-spin text-primary h-12 w-12" />
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Firing up the engines...</p>
                            </div>
                        ) : filteredMotorcycles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredMotorcycles.map(bike => (
                                    <Link key={bike._id} href={`/motorcycles/slug/${bike.slug}`} className="group">
                                        <div className="relative bg-zinc-50 border border-zinc-100 group-hover:border-primary transition-all overflow-hidden flex flex-col h-full">
                                            <div className="aspect-[16/10] overflow-hidden bg-zinc-200">
                                                {bike.images?.[0] ? (
                                                    <img
                                                        src={bike.images[0]}
                                                        alt={bike.modelName}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Bike className="text-zinc-400 h-16 w-16" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{bike.brand?.name}</p>
                                                        <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{bike.modelName}</h3>
                                                    </div>
                                                    <div className="text-lg font-black italic">${bike.price?.toLocaleString()}</div>
                                                </div>
                                                <div className="space-y-3 mt-auto pt-6 border-t border-zinc-200">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                        <span>Displacement</span>
                                                        <span className="text-black">{bike.displacement} CC</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                        <span>Type</span>
                                                        <span className="text-black">{bike.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-black text-white p-4 flex items-center justify-between group-hover:bg-primary transition-colors">
                                                <span className="text-[10px] font-black uppercase tracking-widest">Inspect Machine</span>
                                                <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-40 border-4 border-dashed border-zinc-100">
                                <Bike className="h-16 w-16 text-zinc-200 mx-auto mb-6" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-300">No Machines Found</h3>
                                <p className="text-zinc-400 text-sm mt-2 font-bold">Try adjusting your filters or search terms.</p>
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="mt-8 border-2 border-black rounded-none uppercase font-black px-8"
                                >
                                    Reset All
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
