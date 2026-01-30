"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Bike,
    ChevronLeft,
    Star,
    Zap,
    Shield,
    Settings2,
    Fuel,
    Weight,
    Gauge,
    Loader2,
    Calendar,
    X
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function MotorcycleDetails({ params }) {
    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const { user } = useAuth();

    const [bike, setBike] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [relatedMotorcycles, setRelatedMotorcycles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    const [isQuoting, setIsQuoting] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);

    const handleQuoteRequest = async (e) => {
        e.preventDefault();
        setQuoteLoading(true);
        try {
            const formData = new FormData(e.target);
            await api.post('/contacts', {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: `Quote Request: ${bike.modelName}`,
                message: `Interested in ${bike.brand?.name} ${bike.modelName}. \nPhone: ${formData.get('phone')}`
            });
            setIsQuoting(false);
            alert("Rider Inquiry Dispatched! Our team will contact you shortly.");
        } catch (error) {
            alert("Dispatcher failure. Please try again.");
        } finally {
            setQuoteLoading(false);
        }
    };

    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const bikeData = await api.get(`/motorcycles/slug/${slug}`);
                setBike(bikeData);
                fetchReviews(bikeData._id);
                fetchRelated(bikeData.brand?._id, bikeData._id);
            } catch (error) {
                console.error("Failed to fetch bike details", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchReviews = async (bikeId) => {
            try {
                const reviewsData = await api.get(`/reviews/motorcycle/${bikeId}`);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            }
        };

        const fetchRelated = async (brandId, currentId) => {
            try {
                const data = await api.get(`/motorcycles?brand=${brandId}`);
                setRelatedMotorcycles(data.filter(m => m._id !== currentId).slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch related machines", error);
            }
        };

        fetchBikeData();
    }, [slug]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmittingReview(true);
        try {
            const review = await api.post('/reviews', {
                motorcycleId: bike._id,
                rating: newReview.rating,
                comment: newReview.comment
            });
            setReviews([review, ...reviews]);
            setNewReview({ rating: 5, comment: "" });
        } catch (error) {
            console.error("Failed to submit review", error);
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="animate-spin text-primary h-12 w-12" />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Loading Machine Specs...</p>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="container mx-auto px-6 py-40 text-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Machine Not Found</h2>
                <Link href="/motorcycles">
                    <Button className="mt-8 bg-black hover:bg-primary text-white font-bold uppercase rounded-none px-12 h-14">
                        Back To Fleet
                    </Button>
                </Link>
            </div>
        );
    }

    const specGroups = [
        {
            title: "Performance Intel",
            specs: [
                { label: "Engine Type", value: bike.specifications?.engineType, icon: <Settings2 size={16} /> },
                { label: "Max Power", value: bike.specifications?.maxPower, icon: <Zap size={16} /> },
                { label: "Max Torque", value: bike.specifications?.maxTorque, icon: <Gauge size={16} /> },
                { label: "Top Speed", value: bike.specifications?.topSpeed, icon: <Zap size={16} /> },
            ]
        },
        {
            title: "Chassis & Handling",
            specs: [
                { label: "Weight (Wet)", value: bike.specifications?.weight, icon: <Weight size={16} /> },
                { label: "Suspension", value: bike.specifications?.suspension, icon: <Settings2 size={16} /> },
                { label: "Gearbox", value: bike.specifications?.gearbox, icon: <Settings2 size={16} /> },
            ]
        },
        {
            title: "Braking & Safety",
            specs: [
                { label: "Front Brake", value: bike.specifications?.frontBrake, icon: <Shield size={16} /> },
                { label: "Rear Brake", value: bike.specifications?.rearBrake, icon: <Shield size={16} /> },
                { label: "ABS Protocol", value: bike.specifications?.abs, icon: <Shield size={16} /> },
            ]
        },
        {
            title: "Dimensions",
            specs: [
                { label: "Seat Height", value: bike.specifications?.seatHeight, icon: <Settings2 size={16} /> },
                { label: "Fuel Capacity", value: bike.specifications?.fuelCapacity, icon: <Fuel size={16} /> },
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Header / Nav */}
            <div className="container mx-auto px-6 lg:px-12 py-8">
                <Link href="/motorcycles" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors">
                    <ChevronLeft size={14} /> Back to Fleet Search
                </Link>
            </div>

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-[16/10] bg-zinc-100 border border-zinc-200 relative overflow-hidden group">
                            {bike.images?.[activeImage] ? (
                                <img
                                    src={bike.images[activeImage]}
                                    alt={bike.modelName}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Bike className="text-zinc-300 h-32 w-32" />
                                </div>
                            )}
                        </div>
                        {bike.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {bike.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`aspect-square border-2 transition-all overflow-hidden ${activeImage === i ? "border-primary" : "border-zinc-100 opacity-50 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover grayscale active:grayscale-0" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    {bike.brand?.name}
                                </span>
                                <span className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border border-zinc-200">
                                    {bike.type}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-none">
                                {bike.modelName}
                            </h1>
                            <div className="text-3xl font-bold italic text-primary">
                                ₹{bike.price?.toLocaleString()}
                            </div>
                        </div>

                        <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">
                            {bike.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={() => setIsQuoting(true)}
                                size="lg"
                                className="h-16 px-12 bg-black text-white hover:bg-primary font-black uppercase rounded-none transition-all text-lg flex-1"
                            >
                                Request Quote
                            </Button>
                            <Link href={`/compare?ids=${bike.slug}`}>
                                <Button size="lg" variant="outline" className="h-16 px-10 border-4 border-black text-black hover:bg-black hover:text-white font-black uppercase rounded-none transition-all text-lg">
                                    Compare Specs
                                </Button>
                            </Link>
                        </div>

                        {/* Badges */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-100">
                            <div className="flex items-center gap-3">
                                <Shield className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Warrenty Checked</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Immediate Delivery</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Settings2 className="text-primary h-5 w-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Service Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features & Detailed Specs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-32">
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <div className="flex items-center gap-6 mb-12">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Technical <span className="text-primary not-italic">Arsenal</span></h2>
                                <div className="h-px flex-1 bg-zinc-100" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {specGroups.map((group) => (
                                    <div key={group.title} className="space-y-8">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 border-l-4 border-primary pl-4">{group.title}</h3>
                                        <div className="space-y-6">
                                            {group.specs.map((spec) => (
                                                <div key={spec.label} className="flex justify-between items-end border-b border-zinc-50 pb-2 group">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-zinc-300 group-hover:text-primary transition-colors">{spec.icon}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{spec.label}</span>
                                                    </div>
                                                    <span className="text-sm font-black uppercase italic text-black">{spec.value || "—"}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-16">
                        {bike.features?.length > 0 && (
                            <section className="bg-zinc-900 p-10 border-l-8 border-primary">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-8">Specialized <span className="text-primary not-italic">Intel</span></h2>
                                <div className="space-y-6">
                                    {bike.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="h-6 w-6 bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                                                <Zap size={12} className="text-primary" />
                                            </div>
                                            <p className="text-zinc-400 text-xs font-bold leading-relaxed group-hover:text-white transition-colors">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="bg-zinc-50 p-10 border border-zinc-100 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Security Clearance</h4>
                            <p className="text-xs text-zinc-500 italic">This machine has been verified by MotoSphere technicians for performance and safety protocols.</p>
                            <div className="flex items-center gap-4 py-4 border-y border-zinc-100">
                                <Shield className="text-primary" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Machines */}
                {relatedMotorcycles.length > 0 && (
                    <section className="mt-32">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <h4 className="text-primary font-black uppercase tracking-widest mb-2">Similiar Tech</h4>
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter">More From <span className="text-primary not-italic">{bike.brand?.name}</span></h2>
                            </div>
                            <Link href="/motorcycles" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                                View Full Registry
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedMotorcycles.map(m => (
                                <Link key={m._id} href={`/motorcycles/slug/${m.slug}`} className="group relative bg-zinc-50 border border-zinc-100 hover:border-primary transition-all overflow-hidden p-6">
                                    <div className="aspect-video overflow-hidden mb-6 bg-zinc-200">
                                        <img src={m.images?.[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <h4 className="text-lg font-black uppercase italic tracking-tight mb-2 group-hover:text-primary transition-colors">{m.modelName}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">₹{m.price?.toLocaleString()}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <section className="mt-32 bg-zinc-50 p-12 lg:p-20 border border-zinc-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                        <div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Rider <span className="text-primary not-italic">Feedback</span></h2>
                            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Truth straight from the saddle</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Review List */}
                        <div className="space-y-8">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review._id} className="bg-white p-8 border border-zinc-100 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-black uppercase italic tracking-tight">{review.user?.name}</p>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={i < review.rating ? "text-primary fill-primary" : "text-zinc-200"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 border-2 border-dashed border-zinc-200 bg-white">
                                    <Star className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">No reviews yet for this machine.</p>
                                </div>
                            )}
                        </div>

                        {/* Review Form */}
                        <div className="bg-black text-white p-12 border-l-8 border-primary">
                            {user ? (
                                <form onSubmit={handleReviewSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Post Your <span className="text-primary not-italic">Reckoning</span></h3>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Rating out of 5</label>
                                        <div className="flex gap-4">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: num })}
                                                    className={`h-10 w-10 flex items-center justify-center font-black transition-all ${newReview.rating === num ? "bg-primary text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Your Experience</label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            placeholder="Tell the world why this machine is legendary..."
                                            className="w-full bg-zinc-900 border-none p-6 text-sm font-medium focus:ring-2 focus:ring-primary outline-none min-h-[150px]"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmittingReview}
                                        className="w-full bg-primary text-white hover:bg-white hover:text-black h-14 rounded-none font-black uppercase tracking-widest transition-all"
                                    >
                                        {isSubmittingReview ? <Loader2 className="animate-spin" /> : "Deploy Review"}
                                    </Button>
                                </form>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-400">Locked For <span className="text-primary not-italic">Club Members</span></h3>
                                    <p className="text-zinc-500 text-sm font-medium">You must be signed in to post a technical review of this machine.</p>
                                    <Link href="/auth/login" className="w-full">
                                        <Button className="w-full bg-white text-black hover:bg-primary hover:text-white h-14 rounded-none font-black uppercase tracking-widest transition-all">
                                            Sign In Now
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Quote Modal */}
            {isQuoting && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
                    <div className="bg-white w-full max-w-lg border-l-[12px] border-primary p-12 space-y-8 relative">
                        <button onClick={() => setIsQuoting(null)} className="absolute top-8 right-8 text-zinc-300 hover:text-black transition-colors"><X size={24} /></button>

                        <div className="space-y-2">
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Strategic <span className="text-primary not-italic">Inquiry</span></h2>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">Request high-performance pricing for the {bike.modelName}</p>
                        </div>

                        <form onSubmit={handleQuoteRequest} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Identify Yourself</label>
                                <input name="name" required placeholder="Full Name" className="w-full bg-zinc-50 border-2 border-zinc-100 p-4 font-bold outline-none focus:border-black transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Communication Node</label>
                                    <input name="email" type="email" required placeholder="Email" className="w-full bg-zinc-50 border-2 border-zinc-100 p-4 font-bold outline-none focus:border-black transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tactical Contact</label>
                                    <input name="phone" required placeholder="Phone" className="w-full bg-zinc-50 border-2 border-zinc-100 p-4 font-bold outline-none focus:border-black transition-all" />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={quoteLoading}
                                className="w-full bg-black text-white hover:bg-primary h-16 rounded-none font-black uppercase tracking-widest transition-all text-lg"
                            >
                                {quoteLoading ? <Loader2 className="animate-spin" /> : "Dispatch Quote Request"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
