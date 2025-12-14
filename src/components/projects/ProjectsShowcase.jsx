import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

const ProjectsShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    const projects = [
        {
            title: 'Weather Forecast App',
            category: 'JavaScript App',
            description: 'A real-time weather application showing temperature, humidity, wind speed and dynamic backgrounds based on API data.',
            image: 'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=1200&h=800&fit=crop',
            tags: ['React', 'OpenWeather API', 'Tailwind'],
            github: 'https://github.com/piushmaji/Weather_Application',
            live: 'https://weather-application-cyan-three.vercel.app/',
            gradient: 'from-blue-500 to-cyan-500',
            color: 'blue'
        },
        {
            title: 'Responsive Animated Website — K-72',
            category: 'Frontend + UI/UX',
            description: 'A high-end animated and fully responsive modern website (K-72) with smooth transitions, scroll-triggered animations, and rich visuals.',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
            tags: ['React', 'GSAP', 'Tailwind', 'Responsive Design'],
            github: 'https://github.com/piushmaji/Accuil-K72',
            live: 'https://accuil-k72.vercel.app/',
            gradient: 'from-orange-500 to-red-500',
            color: 'orange'
        },
        {
            title: 'Apple Website Clone',
            category: 'Frontend',
            description: 'A pixel-perfect Apple inspired website clone with smooth animations, parallax sections, product showcases, and modern UI transitions.',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800&fit=crop',
            tags: ['React', 'Tailwind', 'GSAP', 'Framer Motion'],
            github: '#',
            live: '#',
            gradient: 'from-gray-300 to-gray-500',
            color: 'gray'
        },
        {
            title: 'Miranda Animated Website',
            category: 'Creative Frontend',
            description: 'A fully animated, portfolio-style creative website inspired by “Miranda”. Smooth text transitions, scroll animations, and interactive UI elements.',
            image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1200&h=800&fit=crop',
            tags: ['HTML', 'CSS', 'GSAP', 'Locomotive Scroll'],
            github: '#',
            live: '#',
            gradient: 'from-purple-500 to-pink-500',
            color: 'purple'
        }
    ];


    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const scrollPosition = container.scrollTop;
            const itemHeight = container.clientHeight;
            // Added small threshold to make scroll detection more accurate on mobile
            const newIndex = Math.round(scrollPosition / itemHeight);

            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < projects.length) {
                setActiveIndex(newIndex);
            }
        };

        const container = containerRef.current;
        if (container) {
            // Passive listener improves scroll performance on mobile
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeIndex, projects.length]);

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        }
    };

    const scrollToProject = (index) => {
        if (containerRef.current) {
            const itemHeight = containerRef.current.clientHeight;
            containerRef.current.scrollTo({
                top: index * itemHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section
            ref={sectionRef}
            id='projects'
            className="min-h-screen bg-black text-white py-12 md:py-20 scroll-mt-16 relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >

            {/* Dynamic Gradient Background */}
            <div
                className="absolute inset-0 opacity-30 transition-all duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,140,0,0.2), transparent 50%)`
                }}
            ></div>

            {/* Animated Mesh Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
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
                ></div>
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

            {/* Header */}
            <div className="text-center mb-10 md:mb-16 px-4 relative z-10">
                <div className="inline-block mb-4">
                    <div className="relative">
                        <span className="inline-flex items-center gap-2 text-orange-400 text-xs md:text-sm font-light tracking-[0.3em] uppercase border border-orange-500/50 px-4 md:px-6 py-2 rounded-full backdrop-blur-sm bg-orange-500/5 shadow-lg shadow-orange-500/20">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                            CREATIVE WORKS
                        </span>
                        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse"></div>
                    </div>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                    Featured{' '}
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                            Projects
                        </span>
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                    </span>
                </h2>
                <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light px-4">
                    Explore my latest work through an immersive scrolling experience
                </p>
            </div>

            {/* Main Content */}
            <div className="relative max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-8 items-center">

                    {/* Left Side - Project Info Panel */}
                    <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-24">
                            {/* Project Counter */}
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                    0{activeIndex + 1}
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                                <div className="text-gray-500">
                                    / 0{projects.length}
                                </div>
                            </div>

                            {/* Category Badge */}
                            <div className="inline-block mb-4">
                                <div className={`bg-gradient-to-r ${projects[activeIndex].gradient} p-0.5 rounded-full`}>
                                    <div className="bg-black rounded-full px-4 py-1.5">
                                        <span className="text-xs md:text-sm font-light text-orange-400">
                                            {projects[activeIndex].category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight min-h-[3em] lg:min-h-0">
                                {projects[activeIndex].title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                                {projects[activeIndex].description}
                            </p>

                            {/* Tech Stack */}
                            <div className="mb-6 md:mb-8">
                                <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {projects[activeIndex].tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-white/5 border border-white/10 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm text-gray-300 hover:border-orange-500/50 hover:text-orange-400 transition-all"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={projects[activeIndex].github}
                                    className="group flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 px-6 py-3 rounded-xl transition-all"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>View Code</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                </a>
                                <a
                                    href={projects[activeIndex].live}
                                    className="group flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                                >
                                    <span>Live Demo</span>
                                    <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Center - Scrollable Projects */}
                    <div className="lg:col-span-5 order-1 lg:order-2">

                        <div
                            ref={containerRef}
                            className="h-[50vh] md:h-[600px] lg:h-[700px] w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide relative overscroll-contain touch-pan-y"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="h-full w-full snap-start flex items-center justify-center p-2 md:p-4"
                                >
                                    <div
                                        className={`relative w-full h-full transition-all duration-700 ${activeIndex === index
                                            ? 'opacity-100 scale-100 blur-0'
                                            : 'opacity-40 scale-95 blur-[2px]'
                                            }`}
                                    >
                                        {/* Project Card */}
                                        <div className="group relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">

                                            {/* Gradient Border */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} p-[2px] rounded-2xl md:rounded-3xl`}>
                                                <div className="absolute inset-[2px] bg-black rounded-2xl md:rounded-3xl"></div>
                                            </div>

                                            {/* Image Container */}
                                            <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />

                                                {/* Gradient Overlays */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 md:opacity-60"></div>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                                {/* Floating Number */}
                                                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                                                    <div className="text-6xl md:text-8xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                                                        0{index + 1}
                                                    </div>
                                                </div>

                                                {/* Bottom Info (Visible on Image for Mobile Context) */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                                    <div className={`inline-block bg-gradient-to-r ${project.gradient} px-3 py-1 rounded-full text-xs font-light mb-2 md:mb-4`}>
                                                        {project.category}
                                                    </div>
                                                    <h4 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                                                        {project.title}
                                                    </h4>
                                                </div>

                                                {/* Corner Decorations */}
                                                <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl"></div>
                                                <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-r-2 border-orange-500/30 rounded-br-3xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Side - Navigation */}
                    <div className="lg:col-span-3 order-3">
                        <div className="flex flex-row lg:flex-col gap-3 md:gap-6 justify-center lg:sticky lg:top-24 flex-wrap">
                            {projects.map((project, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToProject(index)}
                                    className={`group relative transition-all duration-500 ${activeIndex === index ? 'scale-100 opacity-100' : 'scale-90 opacity-40 hover:opacity-70'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Animated Dot - made slightly larger for touch targets */}
                                        <div className="relative p-2 -m-2">
                                            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${activeIndex === index
                                                ? `bg-gradient-to-r ${project.gradient} shadow-lg shadow-orange-500/50`
                                                : 'bg-gray-700 group-hover:bg-gray-600'
                                                }`}></div>
                                            {activeIndex === index && (
                                                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${project.gradient} animate-ping opacity-75`}></div>
                                            )}
                                        </div>

                                        {/* Project Info */}
                                        <div className="hidden lg:block text-left">
                                            <p className={`text-xs font-light transition-colors ${activeIndex === index ? 'text-orange-400' : 'text-gray-600 group-hover:text-gray-400'
                                                }`}>
                                                {project.category}
                                            </p>
                                            <p className={`text-sm font-semibold transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'
                                                }`}>
                                                Project {index + 1}
                                            </p>
                                        </div>

                                        {/* Active Indicator Line */}
                                        {activeIndex === index && (
                                            <div className={`hidden lg:block w-12 h-px bg-gradient-to-r ${project.gradient}`}></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes meshMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(60px, 60px); }
                }
                
                /* Ensure touch scrolling works nicely */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ProjectsShowcase;