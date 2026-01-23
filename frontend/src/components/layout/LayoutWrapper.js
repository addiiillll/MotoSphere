"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    const isAuthPage = pathname.startsWith('/auth');

    if (isAdminPage) {
        return (
            <div className="flex bg-black min-h-screen">
                <AdminSidebar />
                <main className="flex-1 ml-64 p-8 lg:p-12">
                    {children}
                </main>
            </div>
        );
    }

    if (isAuthPage) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-10">
                    {children}
                </div>
            </main>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
