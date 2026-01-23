"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Calendar,
    User,
    ChevronRight,
    Loader2,
    TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function BlogListing() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await api.get('/posts');
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Blog Header */}
            <section className="bg-black py-24 border-b border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl space-y-6">
                        <h4 className="text-primary font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <span className="h-px w-8 bg-primary" /> Chronicles
                        </h4>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                            The <span className="text-primary not-italic">Gear</span> Report
                        </h1>
                        <p className="text-xl text-zinc-400 font-medium max-w-xl">
                            From track tests to technical deep dives. Stay updated with the latest in motorcycle culture and engineering.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 lg:px-12 py-20">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-primary h-12 w-12" />
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Loading Latest Stories...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <Link key={post._id} href={`/blogs/${post.slug}`} className="group">
                                <article className="space-y-6 flex flex-col h-full bg-white">
                                    <div className="aspect-[16/9] bg-zinc-100 overflow-hidden relative">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText className="text-zinc-300 h-16 w-16" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border border-white/20">
                                                {post.category || "News"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <span className="flex items-center gap-2"><Calendar size={12} className="text-primary" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-2"><User size={12} className="text-primary" /> Editor</span>
                                        </div>

                                        <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed">
                                            {post.content.substring(0, 150)}...
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-zinc-100 flex items-center justify-between group-hover:text-primary transition-colors mt-auto">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Read Full Story</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-zinc-50 border-2 border-dashed border-zinc-200">
                        <TrendingUp className="h-16 w-16 text-zinc-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-300">New Stories Incoming</h3>
                        <p className="text-zinc-400 text-sm mt-2 font-bold uppercase tracking-widest">Our editors are out testing machines right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
