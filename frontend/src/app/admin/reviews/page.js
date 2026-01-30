"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    MessageSquare,
    Trash2,
    Star,
    Loader2,
    Calendar,
    User as UserIcon,
    Bike
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await api.get('/reviews');
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This will remove the member's feedback permanently.")) return;
        try {
            await api.delete(`/reviews/${id}`);
            toast.success("Feedback removed");
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            toast.error(error.message || "Failed to delete review");
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                    Rider <span className="text-primary not-italic">Intel</span>
                </h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Community Feedback & Rating Protocols</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Decrypting satellite uplink...</p>
                    </div>
                ) : reviews.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black border-b border-white/10">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Rider</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Machine</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Rating</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Intel / Comments</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {reviews.map((review) => (
                                    <tr key={review._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-black flex items-center justify-center text-zinc-600 border border-zinc-800 group-hover:border-primary">
                                                    <UserIcon size={14} />
                                                </div>
                                                <div>
                                                    <p className="font-black uppercase text-white italic text-xs">{review.user?.name}</p>
                                                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{review.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase text-[10px]">
                                                <Bike size={12} className="text-primary" /> {review.motorcycle?.modelName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-primary flex gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={10}
                                                    className={i < review.rating ? "text-primary fill-primary" : "text-zinc-800"}
                                                />
                                            ))}
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-xs text-zinc-400 line-clamp-1 max-w-sm">{review.comment}</p>
                                            <p className="text-[8px] text-zinc-600 uppercase tracking-widest mt-1">
                                                <Calendar size={8} className="inline mr-1" /> {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <Button
                                                onClick={() => handleDelete(review._id)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-none"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <MessageSquare className="h-12 w-12 text-zinc-800 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">The frequencies are silent</p>
                    </div>
                )}
            </div>
        </div>
    );
}
