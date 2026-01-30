"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bike, Shield, Zap, TrendingUp, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function Home() {
  const [brands, setBrands] = useState([]);
  const [latestMotorcycles, setLatestMotorcycles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, motorcyclesData] = await Promise.all([
          api.get('/brands'),
          api.get('/motorcycles?isHighlighted=true')
        ]);
        setBrands(brandsData);
        setLatestMotorcycles(motorcyclesData);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    { icon: <Bike className="text-primary" />, title: "Premium Selection", desc: "Curated list of the world's most iconic motorcycles." },
    { icon: <Shield className="text-primary" />, title: "Expert Reviews", desc: "In-depth analysis and track testing by professionals." },
    { icon: <TrendingUp className="text-primary" />, title: "Compare Specs", desc: "Side-by-side comparison of performance and features." },
    { icon: <Zap className="text-primary" />, title: "Latest News", desc: "Real-time updates from the global motorcycle industry." },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-black overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 transform translate-x-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Est. 2026 • Ride The Sphere
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight uppercase italic tracking-tighter">
              Unleash The <br />
              <span className="text-primary not-italic">Adrenaline</span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-xl font-medium leading-relaxed">
              Precision engineering meets ultimate speed. Explore the world's most powerful motorcycles and join the elite club of riders.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/motorcycles">
                <Button size="lg" className="h-16 px-10 bg-primary text-white hover:bg-primary/90 text-lg font-black uppercase rounded-none border-b-4 border-red-900 active:border-b-0 transition-all">
                  Explore Models <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blogs">
                <Button size="lg" variant="outline" className="h-16 px-10 border-2 border-white text-white hover:bg-white hover:text-black text-lg font-black uppercase rounded-none transition-all">
                  Read Expert Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Visual Cue */}
        <div className="absolute bottom-10 left-12 hidden lg:block">
          <div className="flex items-center gap-4 text-zinc-500 uppercase text-[10px] tracking-[0.5em] font-bold vertical-text">
            <span>Scroll To Discover</span>
            <div className="h-12 w-px bg-zinc-800 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Brands Bar */}
      <section className="bg-zinc-950 border-y border-white/5 py-12 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 transition-all">
            {isLoading ? (
              <Loader2 className="animate-spin text-zinc-500" />
            ) : brands.length > 0 ? (
              brands.map((brand) => (
                <span key={brand._id} className="text-2xl md:text-3xl font-black text-white italic tracking-tighter hover:text-primary cursor-default transition-colors uppercase">
                  {brand.name}
                </span>
              ))
            ) : (
              ["Kawasaki", "Ducati", "BMW", "Yamaha", "Honda", "Triumph"].map((brand) => (
                <span key={brand} className="text-2xl md:text-3xl font-black text-white italic tracking-tighter hover:text-primary cursor-default transition-colors uppercase">
                  {brand}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Models Grid */}
      {!isLoading && latestMotorcycles.length > 0 && (
        <section className="py-32 bg-zinc-950 text-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h4 className="text-primary font-black uppercase tracking-widest mb-2">Editor's Choice</h4>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">Featured <span className="text-primary not-italic">Machines</span></h2>
              </div>
              <Link href="/motorcycles" className="text-sm font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                View All Models
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestMotorcycles.map((bike) => (
                <div key={bike._id} className="group relative bg-zinc-900 border border-white/5 hover:border-primary/50 transition-all overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-800">
                    {bike.images?.[0] ? (
                      <img
                        src={bike.images[0]}
                        alt={bike.modelName}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Bike className="text-zinc-700 h-20 w-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">{bike.brand?.name}</p>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">{bike.modelName}</h3>
                      </div>
                      <div className="text-xl font-bold italic text-white">₹{bike.price?.toLocaleString()}</div>
                    </div>
                    <p className="text-zinc-500 text-sm line-clamp-2">{bike.description}</p>
                    <Link href={`/motorcycles/slug/${bike.slug}`}>
                      <Button className="w-full mt-4 bg-zinc-800 hover:bg-primary text-white font-bold uppercase rounded-none transition-all">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-6 group">
                <div className="h-14 w-14 bg-black flex items-center justify-center transform group-hover:bg-primary transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-black">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Model Teaser */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-primary/95 p-12 md:p-20 max-w-4xl border-l-[12px] border-white">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none mb-8">
              Become Part Of <br /> The Legend
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl font-medium">
              Join thousands of enthusiasts worldwide. Get exclusive access to member-only events, track days, and early bird releases.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 text-lg font-black uppercase rounded-none px-12">
                Join The Club Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
