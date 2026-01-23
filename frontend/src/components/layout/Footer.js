import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-primary flex items-center justify-center italic">
                                <span className="text-xl font-black">M</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase italic">
                                Moto<span className="text-primary not-italic">Sphere</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            The ultimate destination for motorcycle enthusiasts. Discover, compare, and ride your dream machine.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-primary font-black uppercase tracking-widest mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link href="/motorcycles" className="text-sm text-zinc-400 hover:text-white transition-colors">Discover Bikes</Link></li>
                            <li><Link href="/brands" className="text-sm text-zinc-400 hover:text-white transition-colors">Top Brands</Link></li>
                            <li><Link href="/compare" className="text-sm text-zinc-400 hover:text-white transition-colors">Compare Models</Link></li>
                            <li><Link href="/accessories" className="text-sm text-zinc-400 hover:text-white transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-primary font-black uppercase tracking-widest mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/blogs" className="text-sm text-zinc-400 hover:text-white transition-colors">Expert Blogs</Link></li>
                            <li><Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-primary font-black uppercase tracking-widest mb-6">Stay Connected</h4>
                        <p className="text-sm text-zinc-400 mb-6">Subscribe to our newsletter for the latest updates.</p>
                        <div className="flex bg-zinc-900 p-1 border border-white/10">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full outline-none"
                            />
                            <button className="bg-primary text-white font-bold px-4 py-2 hover:bg-primary/90 transition-colors uppercase text-xs">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} MotoSphere. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-zinc-500 hover:text-primary transition-colors"><span className="text-xs uppercase tracking-tighter">Instagram</span></Link>
                        <Link href="#" className="text-zinc-500 hover:text-primary transition-colors"><span className="text-xs uppercase tracking-tighter">YouTube</span></Link>
                        <Link href="#" className="text-zinc-500 hover:text-primary transition-colors"><span className="text-xs uppercase tracking-tighter">Twitter</span></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
