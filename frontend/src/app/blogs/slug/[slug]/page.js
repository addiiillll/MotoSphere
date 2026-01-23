"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import {
    Calendar,
    User as UserIcon,
    ChevronLeft,
    Loader2,
    Share2,
    Bookmark
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogPostView({ params }) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await api.get(`/posts/slug/${slug}`);
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch blog post", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="animate-spin text-primary h-12 w-12" />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Opening Archive...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-6 py-40 text-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Story Not Found</h2>
                <Link href="/blogs">
                    <Button className="mt-8 bg-black hover:bg-primary text-white font-bold uppercase rounded-none px-12 h-14">
                        Back To Stories
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-white min-h-screen pb-32">
            {/* Article Header Image */}
            <div className="relative h-[60vh] w-full bg-zinc-900 border-b-8 border-primary">
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale opacity-50"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container mx-auto px-6 lg:px-12 pb-20 space-y-6">
                        <Link href="/blogs" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                            <ChevronLeft size={14} /> Back to Gear Report
                        </Link>

                        <div className="space-y-4 max-w-4xl">
                            <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5">
                                {post.category || "In-Depth"}
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                                {post.title}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center border border-white/20">
                                    <UserIcon size={18} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Authored By</p>
                                    <p className="text-sm font-bold text-white uppercase italic">MotoSphere Editor</p>
                                </div>
                            </div>

                            <div className="h-10 w-px bg-white/20 hidden sm:block" />

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Published On</p>
                                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm">
                                    <Calendar size={14} className="text-primary" />
                                    {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-6 lg:px-12 pt-20">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="lg:flex-1">
                        <div className="prose prose-zinc prose-xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed prose-strong:text-black">
                            {/* Splitting content by newlines for better rendering if it's plain text */}
                            {post.content.split('\n').map((para, i) => para.trim() && (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {/* Tags/Footer */}
                        <div className="mt-20 pt-10 border-t border-zinc-100 flex flex-wrap gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mr-2">Tags:</span>
                            {["Racing", "Tech", "Culture", "Reviews"].map(tag => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-500">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-80 space-y-12">
                        {/* Share */}
                        <div className="bg-zinc-950 p-8 border-l-4 border-primary text-white">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Dispatch Report</h4>
                            <div className="space-y-6">
                                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black rounded-none h-14 uppercase font-black tracking-widest">
                                    <Share2 className="mr-2 h-4 w-4" /> Share Story
                                </Button>
                                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-black rounded-none h-14 uppercase font-black tracking-widest">
                                    <Bookmark className="mr-2 h-4 w-4" /> Save For Later
                                </Button>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="p-8 border border-zinc-100 bg-zinc-50">
                            <h4 className="text-xl font-black uppercase italic tracking-tighter text-black mb-4 leading-tight">
                                Don't Miss <br /> The Pulse
                            </h4>
                            <p className="text-zinc-500 text-xs font-medium mb-6">Join 50,000+ riders getting weekly technical deep-dives.</p>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-white border border-zinc-200 h-12 px-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-primary"
                                />
                                <Button className="w-full bg-black text-white rounded-none h-14 uppercase font-black">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
