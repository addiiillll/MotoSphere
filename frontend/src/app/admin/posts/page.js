"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    FileText,
    Edit,
    Trash2,
    Plus,
    Search,
    Loader2,
    X,
    Save,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        category: "",
        content: ""
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await api.get('/posts');
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await api.put(`/posts/${isEditing}`, formData);
                toast.success("Article updated");
            } else {
                await api.post('/posts', formData);
                toast.success("Article published");
            }
            resetForm();
            fetchPosts();
        } catch (error) {
            toast.error(error.message || "Operation failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (post) => {
        setIsEditing(post._id);
        setIsAdding(true);
        setFormData({
            title: post.title,
            image: post.image || "",
            category: post.category || "",
            content: post.content
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This will remove the article permanently.")) return;
        try {
            await api.delete(`/posts/${id}`);
            toast.success("Article removed");
            setPosts(posts.filter(p => p._id !== id));
        } catch (error) {
            toast.error(error.message || "Failed to delete post");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", image: "", category: "", content: "" });
        setIsEditing(null);
        setIsAdding(false);
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                        Editorial <span className="text-primary not-italic">Suite</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Content Management & Publication</p>
                </div>
                {!isAdding && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        className="bg-primary text-white hover:bg-primary/90 rounded-none h-12 uppercase font-black px-6"
                    >
                        <Plus size={18} className="mr-2" /> Write Article
                    </Button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-zinc-900 border border-white/5 p-8 md:p-12 space-y-10">
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
                            <FileText className="text-primary" /> {isEditing ? "Edit Dispatch" : "New Dispatch"}
                        </h3>
                        <Button variant="ghost" onClick={resetForm} className="text-zinc-500 hover:text-white"><X size={20} /></Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Article Title</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="The Rise of the Supermoto..."
                                    className="bg-black border-zinc-800 text-white rounded-none h-14 focus:border-primary font-bold italic"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Category Tag</Label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="News, Tech, Review..."
                                    className="bg-black border-zinc-800 text-white rounded-none h-14 focus:border-primary font-bold uppercase"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Header Image URL</Label>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                                className="bg-black border-zinc-800 text-zinc-300 rounded-none h-12 focus:border-primary text-xs"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Core Content (Text Only)</Label>
                            <Textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                placeholder="Write your story..."
                                className="bg-black border-zinc-800 text-zinc-300 rounded-none min-h-[400px] focus:border-primary leading-relaxed"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full md:w-auto min-w-[200px] bg-primary text-white hover:bg-primary/90 h-16 rounded-none font-black uppercase tracking-widest text-lg"
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : <><Save size={20} className="mr-3" /> {isEditing ? "Update Article" : "Publish Article"}</>}
                        </Button>
                    </form>
                </div>
            ) : (
                <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-primary h-12 w-12" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Retrieving archives...</p>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {posts.map((post) => (
                                <div key={post._id} className="p-8 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-8">
                                        <div className="h-20 w-32 bg-black border border-white/10 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                            {post.image ? (
                                                <img src={post.image} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-800"><FileText size={32} /></div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-zinc-800 text-zinc-500 border border-white/10">
                                                    {post.category || "General"}
                                                </span>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h4>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{post.slug}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleEdit(post)}
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-zinc-500 hover:text-primary hover:bg-zinc-800 rounded-none"
                                        >
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(post._id)}
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
                            <FileText className="h-12 w-12 text-zinc-800 mx-auto" />
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">No Articles Published</p>
                            <Button onClick={() => setIsAdding(true)} variant="outline" className="border-white/10 text-zinc-400 hover:text-white rounded-none">
                                Start Writing
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
