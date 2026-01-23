"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await login(email, password);
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    Welcome <span className="text-primary not-italic">Back</span>
                </h1>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                    Sign In To Your Account
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="rider@motosphere.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white rounded-none h-12 focus:border-primary transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-zinc-400">Password</Label>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot Password?</Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-zinc-800 border-zinc-700 text-white rounded-none h-12 focus:border-primary transition-colors"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white hover:bg-primary/90 h-14 font-black uppercase rounded-none text-lg disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
                </Button>
            </form>

            <div className="text-center pt-4">
                <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">
                    New to the club?{" "}
                    <Link href="/auth/register" className="text-primary hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
