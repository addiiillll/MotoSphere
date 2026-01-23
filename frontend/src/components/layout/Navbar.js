"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black text-white shadow-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-10 w-10 bg-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-2xl font-black text-white italic">M</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                        Moto<span className="text-primary not-italic">Sphere</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="/motorcycles" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        Motorcycles
                    </Link>
                    <Link href="/brands" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        Brands
                    </Link>
                    <Link href="/accessories" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        Accessories
                    </Link>
                    <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        Blog
                    </Link>
                    <Link href="/contact" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        Contact
                    </Link>
                </div>

                {/* CTA Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link href={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 group">
                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/20 group-hover:border-primary transition-colors">
                                    <UserIcon size={16} className="text-zinc-400 group-hover:text-primary" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest hidden md:inline-block">
                                    {user.name.split(' ')[0]}
                                </span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-zinc-500 hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                <LogOut size={18} />
                                <span className="text-xs font-black uppercase tracking-widest hidden md:inline-block">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="outline" className="hidden lg:inline-flex border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase rounded-none px-6">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="bg-primary text-white hover:bg-primary/90 font-bold uppercase rounded-none px-6">
                                    Join Club
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
