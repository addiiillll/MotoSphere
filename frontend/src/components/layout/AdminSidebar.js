import Link from 'next/link';
import {
    LayoutDashboard,
    Bike,
    Tag,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    Home
} from 'lucide-react';

const AdminSidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
        { icon: <Bike size={20} />, label: "Motorcycles", href: "/admin/motorcycles" },
        { icon: <Tag size={20} />, label: "Brands", href: "/admin/brands" },
        { icon: <FileText size={20} />, label: "Blog Posts", href: "/admin/posts" },
        { icon: <MessageSquare size={20} />, label: "Reviews", href: "/admin/reviews" },
        { icon: <MessageSquare size={20} />, label: "Contacts", href: "/admin/contacts" },
    ];

    return (
        <div className="h-screen w-64 bg-black border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
            {/* Brand */}
            <div className="p-8 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 bg-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-xl font-black text-white italic">M</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase italic text-white">
                        Moto<span className="text-primary not-italic">Sphere</span>
                    </span>
                </Link>
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Admin Panel</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all border-l-2 border-transparent hover:border-primary group"
                    >
                        <span className="group-hover:text-primary transition-colors">{item.icon}</span>
                        <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
                >
                    <Home size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Public Site</span>
                </Link>
                <button className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-primary transition-colors text-left">
                    <LogOut size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
