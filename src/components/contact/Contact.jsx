import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, User, MessageSquare, Github, Linkedin, Twitter, Loader2, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const canvasRef = useRef(null);

    // State for form fields
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    // 3D Model Setup with Orange Theme
    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(600, 600);
        renderer.setPixelRatio(window.devicePixelRatio);

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
            size: 0.1,
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

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            cyberGroup.rotation.x += 0.002;
            cyberGroup.rotation.y += 0.002;

            cyberGroup.rotation.x += mouseY * 0.05;
            cyberGroup.rotation.y += mouseX * 0.05;

            const time = Date.now() * 0.001;
            core.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (canvasRef.current) {
                const size = Math.min(window.innerWidth * 0.5, 600);
                renderer.setSize(size, size);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                from_name: form.name,
                to_name: "Piush Maji",
                from_email: form.email,
                to_email: "piushmaji@example.com",
                message: form.message,
            },
            'YOUR_PUBLIC_KEY'
        )
            .then(() => {
                setLoading(false);
                alert('Thank you! I will get back to you as soon as possible.');
                setForm({ name: '', email: '', message: '' });
            }, (error) => {
                setLoading(false);
                console.log(error);
                alert('Something went wrong. Please try again.');
            });
    };

    return (
        <section
            id="contact"
            className="min-h-screen bg-black text-white py-20 scroll-mt-16 relative overflow-hidden"
        >
            {/* Dynamic Gradient Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black" />
            </div>

            {/* Animated Mesh Grid */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,140,0,0.3) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(255,140,0,0.3) 2px, transparent 2px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'meshMove 20s linear infinite'
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="relative">
                            <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-light tracking-[0.3em] uppercase border border-orange-500/50 px-6 py-2 rounded-full backdrop-blur-sm bg-orange-500/5 shadow-lg shadow-orange-500/20">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                GET IN TOUCH
                            </span>
                            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Let's Work{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                                Together
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        I'm always open to discussing product design work or partnership opportunities
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT SIDE: 3D Model & Context */}
                    <div className="flex flex-col justify-center items-center lg:items-start space-y-8 order-2 lg:order-1">

                        {/* 3D Canvas Container */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-orange-600/20 to-orange-500/20 rounded-3xl blur-2xl opacity-50" />
                            <div className="relative bg-gradient-to-br from-white/[0.02] to-white/[0.01] backdrop-blur-sm border border-white/5 rounded-3xl p-6 overflow-hidden">
                                <canvas ref={canvasRef} className="w-full rounded-2xl cursor-pointer" />

                                {/* Corner Accents */}
                                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-orange-500/40 rounded-tl-xl" />
                                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-orange-500/40 rounded-br-xl" />
                            </div>

                            {/* Interaction Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 p-4 rounded-xl hidden md:block animate-bounce">
                                <p className="text-xs text-orange-300">Interact with me</p>
                                <p className="font-bold text-sm text-white">Move your mouse</p>
                            </div>
                        </div>

                        {/* Info Text */}
                        <div className="text-center lg:text-left max-w-md">
                            <p className="text-gray-400 text-base leading-relaxed mb-6">
                                Whether you have a question, want to start a project, or simply want to connect, feel free to reach out.
                            </p>

                            {/* Email */}
                            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                                <Mail className="w-5 h-5 text-orange-400" />
                                <a href="mailto:piushmaji@example.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                                    piushmaji@example.com
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 justify-center lg:justify-start">
                                {[
                                    { Icon: Github, href: '#' },
                                    { Icon: Linkedin, href: '#' },
                                    { Icon: Twitter, href: '#' }
                                ].map(({ Icon, href }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/10 hover:border-orange-500/30 transition-all cursor-pointer group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-300 group-hover:text-orange-400 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Glass Form */}
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-orange-600/10 to-orange-500/10 rounded-3xl blur-2xl" />
                            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10">

                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1 flex items-center gap-2">
                                            <User className="w-4 h-4 text-orange-400" />
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="What's your name?"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-orange-400" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="What's your email?"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Message Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-orange-400" />
                                            Your Message
                                        </label>
                                        <textarea
                                            rows="5"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="What do you want to say?"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl px-8 py-5 flex items-center justify-center gap-3 group-hover:shadow-2xl group-hover:shadow-orange-500/50 transition-all">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span className="text-lg font-semibold">Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-lg font-semibold">Send Message</span>
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

            <style jsx>{`
                @keyframes meshMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(60px, 60px); }
                }
            `}</style>
        </section>
    );
};

export default Contact;