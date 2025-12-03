import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const WorkExperience = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        const observers = [];

        itemRefs.current.forEach((ref, index) => {
            if (ref) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setVisibleItems(prev => [...new Set([...prev, index])]);
                        }
                    },
                    { threshold: 0.2 }
                );

                observer.observe(ref);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const experiences = [
        {
            title: 'Computer Science Student',
            company: 'Quantum University',
            location: 'Roorkee, India',
            period: 'Aug 2024 – Present',
            description: [
                'Building core CS fundamentals including programming, data structures, and algorithms',
                'Exploring web development, AI, editing, and content creation',
                'Learning to create and manage real projects from scratch',
                'Improving communication, English speaking, and presentation skills'
            ]
        },
        {
            title: 'Hackathon Participant',
            company: 'Team Griffin_Byte',
            location: 'Campus',
            period: 'Oct 2024 – Nov 2024',
            description: [
                'Participated in college hackathon with self-created team Griffin_Byte',
                'Contributed to brainstorming, planning, and problem-solving tasks',
                'Built confidence in teamwork and presenting ideas publicly',
                'Learned real-world debugging, structuring, and collaboration'
            ]
        },
        {
            title: 'Web Developer (Projects)',
            company: 'Personal Projects',
            location: 'Remote',
            period: '2025',
            description: [
                'Created projects like Love Calculator, Secret Talk, and Portfolio website',
                'Learning React, MERN basics, Firebase, and UI/UX concepts',
                'Practicing DSA with Rohit Negi to improve problem-solving',
                'Gaining hands-on experience in teamwork, UX, and design'
            ]
        },
        {
            title: 'Storytelling & Tech Content Creator',
            company: 'Gigglegraph / Personal Brand',
            location: 'Remote',
            period: '2025 – Present',
            description: [
                'Creating storytelling reels, tech shorts, and faceless videos',
                'Practicing editing, cinematography, transitions, and visual storytelling',
                'Working on scripts, English fluency, and content planning',
                'Building long-term personal branding with tech + storytelling mix'
            ]
        }
    ];


    return (
        <section id='work-experience' className="min-h-screen bg-black text-white py-20 scroll-mt-16 overflow-hidden">

            {/* Header */}
            <div className="text-center mb-20 px-6">
                <span className="inline-block text-orange-400 text-sm font-light tracking-widest uppercase border border-orange-500/30 px-4 py-1.5 rounded-full mb-4">
                    What I Have Done So Far
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Experience.</span>
                </h2>
            </div>

            {/* Timeline */}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                {/* Central Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0 hidden lg:block transform -translate-x-1/2"></div>

                {/* Experience Items */}
                <div className="space-y-24">
                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0;
                        const isVisible = visibleItems.includes(index);

                        return (
                            <div
                                key={index}
                                ref={el => itemRefs.current[index] = el}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 top-8 hidden lg:block transform -translate-x-1/2 z-10">
                                    <div className={`w-6 h-6 rounded-full border-4 border-black transition-all duration-700 ${isVisible ? 'bg-orange-500 scale-100' : 'bg-gray-700 scale-0'
                                        }`}>
                                        <div className={`absolute inset-0 rounded-full bg-orange-500 animate-ping ${isVisible ? 'opacity-75' : 'opacity-0'}`}></div>
                                    </div>
                                    {/* Date Badge */}
                                    <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                                        }`}>
                                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1 text-xs text-orange-400">
                                            {exp.period}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={`lg:w-[calc(50%-3rem)] ${isLeft ? 'lg:ml-0 lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:mr-0 lg:pl-16'}`}>
                                    <div
                                        className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 transition-all duration-1000 ${isVisible
                                            ? 'opacity-100 translate-x-0 translate-y-0'
                                            : isLeft
                                                ? 'opacity-0 -translate-x-20 translate-y-10'
                                                : 'opacity-0 translate-x-20 translate-y-10'
                                            }`}
                                        style={{ transitionDelay: '200ms' }}
                                    >
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity duration-500 ${isVisible ? 'group-hover:opacity-100' : ''
                                            }`}></div>

                                        {/* Company Badge */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl lg:text-2xl font-semibold text-white">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-orange-400 font-light">{exp.company}</p>
                                            </div>
                                        </div>

                                        {/* Location & Period - Mobile */}
                                        <div className="flex flex-wrap gap-4 mb-6 lg:hidden">
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                {exp.period}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                                {exp.location}
                                            </div>
                                        </div>

                                        {/* Location - Desktop */}
                                        <div className="hidden lg:flex items-center gap-2 mb-6 text-sm text-gray-400">
                                            <MapPin className="w-4 h-4" />
                                            {exp.location}
                                        </div>

                                        {/* Description */}
                                        <ul className="space-y-3">
                                            {exp.description.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className={`flex gap-3 text-gray-400 text-sm lg:text-base transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                                        }`}
                                                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                                                >
                                                    <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Decorative Corner */}
                                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-orange-500/20 rounded-tr-2xl"></div>
                                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-orange-500/20 rounded-bl-2xl"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-40 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
};

export default WorkExperience;