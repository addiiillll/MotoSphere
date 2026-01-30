"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Bike,
    Save,
    X,
    Plus,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MotorcycleForm({ id = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [brands, setBrands] = useState([]);

    const [formData, setFormData] = useState({
        modelName: "",
        brand: "",
        type: "Sport",
        price: "",
        description: "",
        displacement: "",
        images: [""],
        specifications: {
            engineType: "",
            maxPower: "",
            maxTorque: "",
            fuelCapacity: "",
            weight: "",
            topSpeed: "",
            seatHeight: "",
            gearbox: "",
            frontBrake: "",
            rearBrake: "",
            abs: "",
            suspension: ""
        },
        features: [""],
        isLatest: false,
        isHighlighted: false
    });

    const types = ["Sport", "Cruiser", "Adventure", "Touring", "Naked", "Off-road", "Scooter"];

    useEffect(() => {
        fetchBrands();
        if (id) fetchMotorcycle();
    }, [id]);

    const fetchBrands = async () => {
        try {
            const data = await api.get('/brands');
            setBrands(data);
        } catch (error) {
            console.error("Failed to fetch brands", error);
        }
    };

    const fetchMotorcycle = async () => {
        try {
            const data = await api.get(`/motorcycles/${id}`);
            setFormData({
                ...data,
                brand: data.brand?._id || data.brand,
                price: data.price.toString(),
                displacement: data.displacement.toString(),
                specifications: {
                    engineType: "",
                    maxPower: "",
                    maxTorque: "",
                    fuelCapacity: "",
                    weight: "",
                    topSpeed: "",
                    seatHeight: "",
                    gearbox: "",
                    frontBrake: "",
                    rearBrake: "",
                    abs: "",
                    suspension: "",
                    ...data.specifications
                },
                features: data.features?.length ? data.features : [""]
            });
        } catch (error) {
            toast.error("Failed to load machine data");
            router.push('/admin/motorcycles');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id.startsWith('spec-')) {
            const specField = id.replace('spec-', '');
            setFormData(prev => ({
                ...prev,
                specifications: { ...prev.specifications, [specField]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ""] });
    };

    const removeImageField = (index) => {
        if (formData.images.length === 1) return;
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeatureField = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeatureField = (index) => {
        if (formData.features.length === 1) return;
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                price: Number(formData.price),
                displacement: Number(formData.displacement),
                images: formData.images.filter(img => img.trim() !== ""),
                features: formData.features.filter(f => f.trim() !== "")
            };

            if (id) {
                await api.put(`/motorcycles/${id}`, dataToSubmit);
                toast.success("Machine updated successfully");
            } else {
                await api.post('/motorcycles', dataToSubmit);
                toast.success("Machine added to fleet");
            }
            router.push('/admin/motorcycles');
        } catch (error) {
            toast.error(error.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary h-12 w-12" />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Retrieving machine data...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    {id ? "Override" : "Forge New"} <span className="text-primary not-italic">Machine</span>
                </h1>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-zinc-500 hover:text-white rounded-none uppercase font-black tracking-widest"
                    >
                        Abort
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white hover:bg-primary/90 rounded-none h-12 uppercase font-black px-10 min-w-[160px]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2" /> Save Machine</>}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Core Info */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-zinc-900 border border-white/5 p-8 space-y-8">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-white/10 pb-4">Machine Core</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="modelName" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Model Name</Label>
                                <Input
                                    id="modelName"
                                    value={formData.modelName}
                                    onChange={handleChange}
                                    required
                                    placeholder="E.g. Ninja ZX-10R"
                                    className="bg-black border-zinc-800 text-white rounded-none h-14 focus:border-primary font-bold italic"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brand" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Manufacturer</Label>
                                <select
                                    id="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-zinc-800 text-white rounded-none h-14 px-4 focus:border-primary font-bold outline-none uppercase text-xs"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Machine Type</Label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black border border-zinc-800 text-white rounded-none h-14 px-4 focus:border-primary font-bold outline-none uppercase text-xs"
                                >
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Price ($ USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="18500"
                                    className="bg-black border-zinc-800 text-white rounded-none h-14 focus:border-primary font-bold italic"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Technical overview and selling points..."
                                className="bg-black border-zinc-800 text-zinc-300 rounded-none min-h-[150px] focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 p-8 space-y-8">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-white/10 pb-4">Technical Arsenal</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="displacement" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Displacement (CC)</Label>
                                <Input id="displacement" type="number" value={formData.displacement} onChange={handleChange} required className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-engineType" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Engine Type</Label>
                                <Input id="spec-engineType" value={formData.specifications.engineType} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-maxPower" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Max Power</Label>
                                <Input id="spec-maxPower" value={formData.specifications.maxPower} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-maxTorque" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Max Torque</Label>
                                <Input id="spec-maxTorque" value={formData.specifications.maxTorque} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-fuelCapacity" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Fuel Cap.</Label>
                                <Input id="spec-fuelCapacity" value={formData.specifications.fuelCapacity} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-topSpeed" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Top Speed</Label>
                                <Input id="spec-topSpeed" value={formData.specifications.topSpeed} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-seatHeight" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Seat Height</Label>
                                <Input id="spec-seatHeight" value={formData.specifications.seatHeight} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-gearbox" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Gearbox</Label>
                                <Input id="spec-gearbox" value={formData.specifications.gearbox} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-frontBrake" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Front Brake</Label>
                                <Input id="spec-frontBrake" value={formData.specifications.frontBrake} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-rearBrake" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Rear Brake</Label>
                                <Input id="spec-rearBrake" value={formData.specifications.rearBrake} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-abs" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">ABS Protocol</Label>
                                <Input id="spec-abs" value={formData.specifications.abs} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-suspension" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Suspension</Label>
                                <Input id="spec-suspension" value={formData.specifications.suspension} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spec-weight" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Weight</Label>
                                <Input id="spec-weight" value={formData.specifications.weight} onChange={handleChange} className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 p-8 space-y-8">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-white/10 pb-4">Specialized Features</h3>
                        <div className="space-y-4">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        placeholder="E.g. Ride-by-wire Throttle"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="bg-black border-zinc-800 text-white rounded-none focus:border-primary font-bold italic"
                                    />
                                    <button type="button" onClick={() => removeFeatureField(index)} className="text-zinc-700 hover:text-primary"><X size={20} /></button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={addFeatureField}
                                className="text-zinc-500 hover:text-white uppercase font-black text-[10px] tracking-widest"
                            >
                                <Plus size={14} className="mr-2" /> Add Feature
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Media & Settings */}
                <div className="space-y-8">
                    <div className="bg-zinc-900 border border-white/5 p-8 space-y-8">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-white/10 pb-4">Visual Data</h3>
                        <div className="space-y-6">
                            {formData.images.map((img, index) => (
                                <div key={index} className="space-y-2 relative group">
                                    <div className="flex justify-between items-center mb-1">
                                        <Label className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Angle {index + 1}</Label>
                                        <button type="button" onClick={() => removeImageField(index)} className="text-zinc-700 hover:text-primary"><X size={12} /></button>
                                    </div>
                                    <Input
                                        placeholder="Image URL"
                                        value={img}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        className="bg-black border-zinc-800 text-white rounded-none h-10 focus:border-primary text-xs"
                                    />
                                    {img && (
                                        <div className="mt-2 aspect-video bg-black border border-white/10 overflow-hidden">
                                            <img src={img} className="w-full h-full object-cover grayscale opacity-50" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addImageField}
                                className="w-full border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-none border-dashed border-2 py-8"
                            >
                                <Plus size={16} className="mr-2" /> Add Viewpoint
                            </Button>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 p-8 space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary border-b border-white/10 pb-4">Visibility</h3>
                        <div className="space-y-6">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.isLatest}
                                    onChange={(e) => setFormData({ ...formData, isLatest: e.target.checked })}
                                    className="h-5 w-5 accent-primary bg-black border-zinc-800 rounded-none"
                                />
                                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors underline-offset-4 group-hover:underline">Mark as Latest Release</span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.isHighlighted}
                                    onChange={(e) => setFormData({ ...formData, isHighlighted: e.target.checked })}
                                    className="h-5 w-5 accent-primary bg-black border-zinc-800 rounded-none"
                                />
                                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors underline-offset-4 group-hover:underline">Feature on Homepage</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
