"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Bike,
    Edit,
    Trash2,
    Plus,
    Search,
    Loader2,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminMotorcycles() {
    const [motorcycles, setMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchMotorcycles();
    }, []);

    const fetchMotorcycles = async () => {
        setLoading(true);
        try {
            const data = await api.get('/motorcycles');
            setMotorcycles(data);
        } catch (error) {
            console.error("Failed to fetch motorcycles", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this machine? This action cannot be undone.")) return;

        try {
            await api.delete(`/motorcycles/${id}`);
            toast.success("Machine deleted successfully");
            setMotorcycles(motorcycles.filter(m => m._id !== id));
        } catch (error) {
            toast.error(error.message || "Failed to delete machine");
        }
    };

    const filteredMotorcycles = motorcycles.filter(bike =>
        bike.modelName.toLowerCase().includes(search.toLowerCase()) ||
        bike.brand?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        Manage <span className="text-primary not-italic">Fleet</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Global Machine Catalog</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
                        <Input
                            placeholder="Search catalog..."
                            className="bg-zinc-900 border-zinc-800 text-white rounded-none pl-9 h-12 focus:border-primary"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Link href="/admin/motorcycles/new">
                        <Button className="bg-primary text-white hover:bg-primary/90 rounded-none h-12 uppercase font-black px-6">
                            <Plus size={18} className="mr-2" /> Add New
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Syncing with hanger...</p>
                    </div>
                ) : filteredMotorcycles.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black border-b border-white/10">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Machine</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Brand</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Price</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredMotorcycles.map((bike) => (
                                    <tr key={bike._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-16 bg-black border border-white/10 overflow-hidden shrink-0">
                                                    {bike.images?.[0] ? (
                                                        <img src={bike.images[0]} className="w-full h-full object-cover grayscale" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-800"><Bike size={24} /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black uppercase text-white italic">{bike.modelName}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{bike.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-bold uppercase text-xs text-zinc-300">{bike.brand?.name}</td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-zinc-800 border border-white/10 text-zinc-400">
                                                {bike.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-black text-primary">${bike.price?.toLocaleString()}</td>
                                        <td className="px-6 py-6">
                                            {bike.isHighlighted && (
                                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-primary/20 text-primary border border-primary/30">
                                                    Featured
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/motorcycles/slug/${bike.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-none">
                                                        <ExternalLink size={14} />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/motorcycles/edit/${bike._id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-primary hover:bg-zinc-800 rounded-none">
                                                        <Edit size={14} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => handleDelete(bike._id)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-none"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <Bike className="h-12 w-12 text-zinc-800 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">The hangar is empty</p>
                        <Link href="/admin/motorcycles/new">
                            <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white rounded-none">
                                Add Your First Machine
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
