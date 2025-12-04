import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, User, MessageSquare, Github, Linkedin, Twitter, Loader2, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const Contact = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    // Three.js 3D Model Setup
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        // Function to update size based on parent container
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                // Make height proportional or fixed, square is good for this sphere
                const height = width;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };

        // Initial size
        updateSize();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create the Cyber Sphere with Orange Theme
        const geometry = new THREE.IcosahedronGeometry(2, 1);

        // Wireframe Material (Orange Grid)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        // Points Material (Orange Nodes)
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xffa500,
            size: 0.15, // Slightly larger for visibility
            transparent: true,
            opacity: 0.8
        });

        const sphere = new THREE.Mesh(geometry, wireframeMaterial);
        const points = new THREE.Points(geometry, pointsMaterial);

        const cyberGroup = new THREE.Group();
        cyberGroup.add(sphere);
        cyberGroup.add(points);

        // Inner glowing orange core
        const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.5,
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        cyberGroup.add(core);

        scene.add(cyberGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff8c00, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation Loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            cyberGroup.rotation.x += 0.002;
            cyberGroup.rotation.y += 0.003;

            const time = Date.now() * 0.001;
            core.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

            // Subtle floating effect
            cyberGroup.position.y = Math.sin(time) * 0.1;

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize properly
        const resizeObserver = new ResizeObserver(() => updateSize());
        resizeObserver.observe(containerRef.current);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            renderer.dispose();
            geometry.dispose();
            wireframeMaterial.dispose();
            pointsMaterial.dispose();
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            // In a real app, replace this with a toast notification
            const successDiv = document.createElement('div');
            successDiv.textContent = 'Message sent successfully!';
            successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ea580c; color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 9999; animation: fadeIn 0.3s ease-out;';
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 3000);

            setForm({ name: '', email: '', message: '' });
        }, 2000);
    };

    return (
        <section
            id="contact"
            className="min-h-screen bg-black text-white py-20 lg:py-32 relative overflow-hidden flex items-center"
        >
            {/* --- Background Effects --- */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/20 to-black" />
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)'
                    }}
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />


            {/* --- Main Content --- */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">

                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-24" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-6">
                        <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                        <span className="text-xs md:text-sm font-semibold tracking-widest text-orange-300 uppercase">
                            Get In Touch
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                        Let's Work{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
                            Together
                        </span>
                    </h2>

                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        I'm always open to discussing product design work or partnership opportunities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* --- Left Column: Contact Info & 3D Sphere --- */}
                    {/* On mobile, this appears SECOND (order-2). On Desktop, it's LEFT (order-1) */}
                    <div className="order-2 lg:order-1 flex flex-col gap-10" data-aos="fade-right">

                        {/* 3D Model Container */}
                        <div
                            ref={containerRef}
                            className="relative w-full aspect-square max-w-[400px] mx-auto lg:mx-0 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                            {/* Decorative Corner Borders */}
                            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-orange-500/30 rounded-tl-xl pointer-events-none" />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-orange-500/30 rounded-br-xl pointer-events-none" />

                            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

                            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                <span className="text-xs font-mono text-orange-400/80 tracking-widest bg-black/50 px-3 py-1 rounded-full">
                                    INTERACTIVE 3D
                                </span>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="text-center lg:text-left space-y-6">
                            <p className="text-gray-400 text-lg">
                                Have a project in mind? Drop me a line at:
                            </p>

                            <a
                                href="mailto:piushmaji@example.com"
                                className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:text-orange-400 transition-colors group"
                            >
                                <Mail className="w-6 h-6 md:w-8 md:h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                                piushmaji@gmail.com
                            </a>

                            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                                {[
                                    { Icon: Github, href: 'https://github.com/piushmaji', label: 'Github' },
                                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/piush-maji-4aa2a72b9/', label: 'LinkedIn' },
                                    { Icon: Twitter, href: 'https://x.com/piushmaji', label: 'Twitter' }
                                ].map(({ Icon, href, label }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all duration-300 group"
                                    >
                                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-black transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Form --- */}
                    {/* On mobile, this appears FIRST (order-1). On Desktop, it's RIGHT (order-2) */}
                    <div className="order-1 lg:order-2 w-full" data-aos="fade-left">
                        <div className="relative group">
                            {/* Animated Border Gradient */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                            <div className="relative bg-[#0a0a0a] ring-1 ring-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
                                <h3 className="text-2xl font-bold mb-2">Send me a message</h3>
                                <p className="text-gray-500 mb-8 text-sm">Fill out the form below and I'll get back to you shortly.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <User className="w-4 h-4 text-orange-500" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-orange-500" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-orange-500" />
                                            Message
                                        </label>
                                        <textarea
                                            rows="5"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your project..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;