import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, User, MessageSquare, Github, Linkedin, Twitter, Loader2, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const Contact = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    // ... [Keep your form state logic here] ...

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

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

        // Optimization: Reduce pixel ratio on mobile to 1 to prevent overheating/lag
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);

        const updateSize = () => {
            if (containerRef.current && renderer) {
                const width = containerRef.current.clientWidth;
                const height = width; // Keep it square
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };

        updateSize();

        // GEOMETRY
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xffa500,
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });

        const sphere = new THREE.Mesh(geometry, wireframeMaterial);
        const points = new THREE.Points(geometry, pointsMaterial);
        const cyberGroup = new THREE.Group();
        cyberGroup.add(sphere);
        cyberGroup.add(points);

        const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.5,
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        cyberGroup.add(core);

        scene.add(cyberGroup);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff8c00, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // ANIMATION
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            cyberGroup.rotation.x += 0.002;
            cyberGroup.rotation.y += 0.003;
            const time = Date.now() * 0.001;
            core.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            cyberGroup.position.y = Math.sin(time) * 0.1;
            renderer.render(scene, camera);
        };
        animate();

        // RESIZE OBSERVER
        const resizeObserver = new ResizeObserver(() => {
            // Debounce slightly to prevent "Loop limit exceeded" error
            requestAnimationFrame(updateSize);
        });
        resizeObserver.observe(containerRef.current);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();

            // CLEANUP THREE.JS
            geometry.dispose();
            wireframeMaterial.dispose();
            pointsMaterial.dispose();
            coreGeometry.dispose();
            coreMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    // ... [Keep your handleChange and handleSubmit logic] ...
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
            {/* ... [Keep all your JSX for layout exactly as it was] ... */}
            {/* Note: Ensure the containerRef is attached to the parent of the canvas */}

            {/* Copied from your original file for context, modify minimal parts */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/20 to-black" />
            </div>

            {/* ... (Rest of background effects) ... */}

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
                <div className="text-center mb-16 lg:mb-24" data-aos="fade-up">
                    {/* ... (Header Content) ... */}
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                        Let's Work{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
                            Together
                        </span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1 flex flex-col gap-10" data-aos="fade-right">

                        {/* 3D Model Container */}
                        <div
                            ref={containerRef}
                            className="relative w-full aspect-square max-w-[400px] mx-auto lg:mx-0 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden"
                        >
                            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
                        </div>

                        {/* ... (Contact Details) ... */}
                        <div className="text-center lg:text-left space-y-6">
                            <p className="text-gray-400 text-lg">
                                Have a project in mind? Drop me a line at:
                            </p>
                            <a href="mailto:piushmaji@gmail.com" className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:text-orange-400 transition-colors group">
                                <Mail className="w-6 h-6 md:w-8 md:h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                                piushmaji@gmail.com
                            </a>
                            {/* ... Socials ... */}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 w-full" data-aos="fade-left">
                        {/* ... (Form JSX) ... */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative bg-[#0a0a0a] ring-1 ring-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* ... Inputs ... */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <User className="w-4 h-4 text-orange-500" />
                                            Full Name
                                        </label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-orange-500" />
                                            Email Address
                                        </label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-orange-500" />
                                            Message
                                        </label>
                                        <textarea rows="5" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none" required />
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed">
                                        <div className="flex items-center justify-center gap-2">
                                            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></> : <><span>Send Message</span><Send className="w-5 h-5" /></>}
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