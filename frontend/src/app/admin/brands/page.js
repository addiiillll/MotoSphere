"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Tag,
    Edit,
    Trash2,
    Plus,
    Search,
    Loader2,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminBrands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ name: "", logo: "", description: "" });

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const data = await api.get('/brands');
            setBrands(data);
        } catch (error) {
            console.error("Failed to fetch brands", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await api.put(`/brands/${isEditing}`, formData);
                toast.success("Brand updated successfully");
            } else {
                await api.post('/brands', formData);
                toast.success("New brand registered");
            }
            setFormData({ name: "", logo: "", description: "" });
            setIsEditing(null);
            fetchBrands();
        } catch (error) {
            toast.error(error.message || "Operation failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (brand) => {
        setIsEditing(brand._id);
        setFormData({ name: brand.name, logo: brand.logo || "", description: brand.description || "" });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? All machines linked to this brand may be affected.")) return;
        try {
            await api.delete(`/brands/${id}`);
            toast.success("Brand decommissioned");
            setBrands(brands.filter(b => b._id !== id));
        } catch (error) {
            toast.error(error.message || "Failed to delete brand");
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        Partner <span className="text-primary not-italic">Network</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Manufacturer Registry</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-zinc-900 border border-white/5 p-8 sticky top-24 space-y-8">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <Plus className="text-primary" size={20} />
                            <h3 className="text-lg font-black uppercase tracking-widest text-white">
                                {isEditing ? "Modify Brand" : "Register Brand"}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Brand Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="E.g. Ducati"
                                    className="bg-black border-zinc-800 text-white rounded-none h-14 focus:border-primary font-bold uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Logo URL</Label>
                                <Input
                                    id="logo"
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-black border-zinc-800 text-white rounded-none h-12 focus:border-primary text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Legacy / Details</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="History and mission of the manufacturer..."
                                    className="bg-black border-zinc-800 text-zinc-300 rounded-none h-32 focus:border-primary text-xs"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-none h-14 uppercase font-black tracking-widest"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Brand" : "Add Brand")}
                                </Button>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => { setIsEditing(null); setFormData({ name: "", logo: "", description: "" }); }}
                                        className="border-zinc-800 text-zinc-500 hover:text-white rounded-none h-14"
                                    >
                                        <X size={18} />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                        {loading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-primary h-12 w-12" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Consulting records...</p>
                            </div>
                        ) : brands.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {brands.map((brand) => (
                                    <div key={brand._id} className="p-8 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-8">
                                            <div className="h-16 w-16 bg-black border border-white/10 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                {brand.logo ? (
                                                    <img src={brand.logo} className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <Tag className="text-zinc-800" size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">
                                                    {brand.name}
                                                </h4>
                                                <p className="text-xs text-zinc-500 line-clamp-1 max-w-md">{brand.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleEdit(brand)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-zinc-500 hover:text-primary hover:bg-zinc-800 rounded-none"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(brand._id)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 w-10 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-none"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <Tag className="h-12 w-12 text-zinc-800 mx-auto" />
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">No Manufacturers Registered</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
