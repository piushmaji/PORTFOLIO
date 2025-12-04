import React, { useState } from "react";
import { Instagram, Github, Linkedin, Mail, ArrowUp, Copy, Check } from "lucide-react";

export default function Footer() {
    const [copied, setCopied] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("piushmaji@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <footer className="w-full bg-black text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden font-sans">

            {/* Minimal Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

                {/* 1. TOP: CTA & Scroll Button */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            Ready to <span className="text-orange-500">Elevate?</span>
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Crafting seamless digital experiences.
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
                    >
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400 group-hover:text-orange-400 transition-colors">Back to Top</span>
                        <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-orange-400 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 mb-12"></div>

                {/* 2. MIDDLE: Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Identity (Span 5) */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold tracking-wide">PIUSH MAJI<span className="text-orange-500">.</span></h3>
                            <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-xs">
                                Software Developer & Designer focused on building accessible, pixel-perfect, and performant web experiences.
                            </p>
                        </div>

                        {/* Interactive Email Copy */}
                        <div className="mt-8">
                            <button
                                onClick={handleCopyEmail}
                                className="group flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95 w-fit"
                            >
                                <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 text-orange-400 transition-colors">
                                    {copied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Get in touch</p>
                                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                        {copied ? "Email Copied!" : "piushmaji@gmail.com"}
                                    </p>
                                </div>
                                {copied ? null : <Copy className="w-3 h-3 text-gray-600 group-hover:text-white ml-2 opacity-0 group-hover:opacity-100 transition-all" />}
                            </button>
                        </div>
                    </div>

                    {/* Navigation (Span 3) */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Sitemap</h4>
                        <ul className="space-y-4">
                            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials (Span 4) */}
                    <div className="md:col-span-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Connect</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { Icon: Github, label: "Github", href: "https://github.com/piushmaji" },
                                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/piush-maji-4aa2a72b9/" },
                                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/piushhmaji/" }
                            ].map(({ Icon, label, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="group flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                                    <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} Piush Maji. All rights reserved.</p>
                    <p className="opacity-50 hover:opacity-100 transition-opacity">
                        Designed in <span className="text-orange-500">React</span> & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
}