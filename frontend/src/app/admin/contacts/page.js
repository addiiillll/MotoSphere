"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    Mail,
    Phone,
    User,
    Calendar,
    Loader2,
    CheckCircle2,
    Clock,
    Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminContacts() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const data = await api.get('/contacts');
            setInquiries(data);
        } catch (error) {
            console.error("Failed to fetch inquiries", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/contacts/${id}/status`, { status });
            toast.success(`Priority updated to ${status}`);
            setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="space-y-2">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                    Dispatch <span className="text-primary not-italic">Center</span>
                </h1>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Inbound Inquiries & Communications</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 bg-zinc-900 border border-white/5">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Syncing with field agents...</p>
                    </div>
                ) : inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-zinc-900 border border-white/5 p-8 space-y-6 relative overflow-hidden group hover:border-primary/30 transition-all">
                            {/* Priority Indicator */}
                            <div className={`absolute top-0 right-0 h-1 w-24 transform translate-x-8 translate-y-2 rotate-45 ${inquiry.status === 'resolved' ? 'bg-green-500' : 'bg-primary'}`} />

                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black uppercase italic tracking-tight text-white">{inquiry.subject}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><User size={12} className="text-primary" /> {inquiry.name}</span>
                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {inquiry.status !== 'resolved' ? (
                                        <Button
                                            onClick={() => handleStatusUpdate(inquiry._id, 'resolved')}
                                            className="h-8 px-3 bg-zinc-800 hover:bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-none transition-all"
                                        >
                                            <CheckCircle2 size={12} className="mr-2" /> Mark Resolved
                                        </Button>
                                    ) : (
                                        <span className="h-8 px-3 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center border border-green-500/20">
                                            Resolved
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="bg-black/50 p-6 border border-white/5 space-y-4">
                                <p className="text-sm text-zinc-400 leading-relaxed italic">"{inquiry.message}"</p>
                                <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-3 text-xs font-bold text-zinc-500 hover:text-primary transition-colors">
                                        <Mail size={14} /> {inquiry.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                    {inquiry.status === 'resolved' ? 'Archive Ready' : 'Awaiting Dispatch'}
                                </div>
                                <Button className="h-10 px-6 bg-primary text-white hover:bg-white hover:text-black rounded-none transition-all uppercase font-black text-xs tracking-widest">
                                    Reply <Send size={14} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center space-y-4 bg-zinc-900 border border-white/5">
                        <Mail className="h-12 w-12 text-zinc-800 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">The dispatch queue is clear</p>
                    </div>
                )}
            </div>
        </div>
    );
}
