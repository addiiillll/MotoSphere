"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Send,
    Phone,
    Mail,
    MapPin,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/contacts', formData);
            setIsSuccess(true);
            toast.success("Message sent! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            toast.error(error.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <section className="bg-black py-32 border-b-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl space-y-6">
                        <h4 className="text-primary font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" /> Reach Out
                        </h4>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                            Connect With <br /> The <span className="text-primary not-italic">Engineers</span>
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-xl leading-relaxed">
                            Have questions about a machine or want to join the club? Drop us a line and we'll handle the rest.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <div className="space-y-16">
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="h-16 w-16 bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Direct Line</p>
                                    <p className="text-2xl font-black uppercase italic tracking-tight text-black">+1 (800) MOTO-SPHERE</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="h-16 w-16 bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Dispatch</p>
                                    <p className="text-2xl font-black uppercase italic tracking-tight text-black">contact@motosphere.com</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="h-16 w-16 bg-black text-white flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">HQ Location</p>
                                    <p className="text-2xl font-black uppercase italic tracking-tight text-black">742 Adrenaline Way, <br /> Trackside, CA 90210</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-950 p-12 border-l-8 border-primary text-white space-y-6">
                            <h4 className="text-xl font-black uppercase italic tracking-tighter text-primary">Operating Hours</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mon - Fri</span>
                                    <span className="text-sm font-bold uppercase italic text-white">08:00 - 20:00</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Saturday</span>
                                    <span className="text-sm font-bold uppercase italic text-white">10:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sunday</span>
                                    <span className="text-sm font-bold uppercase italic text-primary">Track Day (Closed)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-zinc-50 p-12 lg:p-16 border border-zinc-100 relative">
                        {isSuccess ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                                <div className="h-24 w-24 bg-primary text-white rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Message <span className="text-primary not-italic">Received</span></h2>
                                <p className="text-zinc-500 font-medium max-w-xs">One of our specialists will reach out to you within 24 hours.</p>
                                <Button
                                    onClick={() => setIsSuccess(false)}
                                    variant="outline"
                                    className="border-2 border-black rounded-none uppercase font-black px-12 h-14"
                                >
                                    Send Another
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Your Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Wick"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="bg-white border-2 border-zinc-200 h-14 rounded-none focus:border-black font-bold uppercase transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="rider@sphere.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="bg-white border-2 border-zinc-200 h-14 rounded-none focus:border-black font-bold transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Subject Inquiry</Label>
                                    <Input
                                        id="subject"
                                        placeholder="E.g. Technical Support, Sales Inquiry"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="bg-white border-2 border-zinc-200 h-14 rounded-none focus:border-black font-bold uppercase transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Detailed Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your machine or your question..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="bg-white border-2 border-zinc-200 min-h-[200px] rounded-none focus:border-black font-medium transition-all"
                                    />
                                </div>

                                <Button
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white hover:bg-primary h-16 rounded-none font-black uppercase tracking-widest text-lg disabled:opacity-50"
                                    type="submit"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : (
                                        <span className="flex items-center gap-3">Dispatch Message <Send size={18} /></span>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
