import React, { useState, useEffect, useRef } from 'react';
import { Code, Palette, Zap, Database, Globe, Terminal } from 'lucide-react';

const About = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    const skills = [
        { icon: Code, name: 'React & Next.js', level: 90 },
        { icon: Palette, name: 'UI/UX Design', level: 85 },
        { icon: Terminal, name: 'JavaScript/TS', level: 88 },
        { icon: Database, name: 'Backend Dev', level: 80 },
        { icon: Globe, name: 'Web3 & DApps', level: 75 },
        { icon: Zap, name: 'Performance', level: 92 }
    ];

    return (
        <section
            id='about'
            ref={sectionRef}
            className="min-h-screen bg-black text-white relative overflow-hidden flex items-center scroll-mt-16"
            onMouseMove={handleMouseMove}
        >
            {/* Gradient Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 140, 0, 0.15), transparent 50%)`
                }}
            />

            <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: 3D Element */}
                    <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* Floating 3D Cube */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80" style={{ perspective: '1000px' }}>
                                <div
                                    className="absolute inset-0 transition-transform duration-700 hover:scale-110"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        animation: 'float 6s ease-in-out infinite'
                                    }}
                                >
                                    {/* Cube faces */}
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateY(0deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Clean Code
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateY(90deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Creative
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateY(180deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Innovative
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateY(-90deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Scalable
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateX(90deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Modern
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-sm"
                                        style={{ transform: 'rotateX(-90deg) translateZ(80px)' }}>
                                        <div className="flex items-center justify-center h-full text-orange-400 text-xl font-light">
                                            Responsive
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute inset-0 blur-3xl bg-orange-500/20 -z-10 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className={`space-y-8 order-1 lg:order-2 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>

                        {/* About Text */}
                        <div>
                            <div className="sm:inline-block mb-4 -mt-14 lg:flex ">
                                <span className="text-orange-400 text-sm font-light tracking-widest uppercase border border-orange-500/30 px-4 py-1.5 rounded-full">
                                    About Me
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Crafting Digital
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Experiences</span>
                            </h2>

                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                                I'm a passionate front-end developer and designer who loves turning ideas into interactive realities.
                                With a focus on clean code and intuitive design, I build solutions that are both beautiful and functional.
                            </p>

                            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                Currently exploring the intersection of modern web technologies and creative problem-solving,
                                I'm always eager to learn and push the boundaries of what's possible on the web.
                            </p>
                        </div>

                        {/* Skills - Minimal */}
                        <div className="pt-6">
                            <h3 className="text-lg md:text-xl font-light mb-4 text-gray-300">Core Skills</h3>

                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        className="group relative flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                            animation: isVisible ? 'slideUp 0.5s ease-out forwards' : 'none',
                                            opacity: isVisible ? 1 : 0
                                        }}
                                    >
                                        <skill.icon className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="text-sm text-gray-300 font-light">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400">50+</div>
                                <div className="text-xs md:text-sm text-gray-400 mt-1">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400">3+</div>
                                <div className="text-xs md:text-sm text-gray-400 mt-1">Years</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400">20+</div>
                                <div className="text-xs md:text-sm text-gray-400 mt-1">Clients</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: rotateX(-20deg) rotateY(20deg) translateY(0px); }
          50% { transform: rotateX(-20deg) rotateY(200deg) translateY(-20px); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

        </section>
    );
};

export default About;