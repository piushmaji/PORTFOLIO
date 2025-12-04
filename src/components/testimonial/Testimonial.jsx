import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

export default function TestimonialSection() {
    const testimonials = [
        {
            name: "Amit Sharma",
            role: "Frontend Developer",
            feedback: "Piush absorbs concepts fast and executes with precision.",
            img: "https://i.pravatar.cc/150?img=11",
            stars: 5,
        },
        {
            name: "Rohit Negi",
            role: "DSA Mentor",
            feedback: "His logic is structured and scalable. Very rare clarity.",
            img: "https://i.pravatar.cc/150?img=12",
            stars: 5,
        },
        {
            name: "Sneha Kapoor",
            role: "UI/UX Designer",
            feedback: "His design taste is clean and aesthetic.",
            img: "https://i.pravatar.cc/150?img=13",
            stars: 4,
        },
        {
            name: "Karan Verma",
            role: "Backend Engineer",
            feedback: "Debugging speed is insane. Solves issues fast.",
            img: "https://i.pravatar.cc/150?img=14",
            stars: 5,
        },
        {
            name: "Riya Patel",
            role: "Product Manager",
            feedback: "Great communication + strong execution.",
            img: "https://i.pravatar.cc/150?img=15",
            stars: 5,
        },
    ];

    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Detect Screen Size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto Scroll Timer
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [testimonials.length, isPaused]);

    // Dynamic Transform Logic
    const getTransformStyle = () => {
        if (isMobile) {
            // Mobile: Slide 100% per card
            return `translateX(-${index * 100}%)`;
        }
        // Desktop: Slide 33.33% per card but offset by 33.33% to center the active one
        return `translateX(calc(-${index * 33.33}% + 33.33%))`;
    };

    return (
        <section id="testimonial" className="w-full bg-black text-white py-16 md:py-24 px-4 overflow-hidden relative">

            {/* Background Gradients for smooth fade effect on edges (Desktop only) */}
            <div className="hidden md:block absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Testimonials
                </h2>
                <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
                <p className="text-gray-400 text-sm md:text-lg">
                    What people are saying about my work
                </p>
            </div>

            {/* VIEWPORT */}
            <div
                className="relative w-full max-w-7xl mx-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >

                {/* TRACK */}
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                        transform: getTransformStyle(),
                    }}
                >
                    {testimonials.map((t, i) => {
                        const isCenter = i === index;

                        // Mobile: Always Opacity 1
                        // Desktop: Opacity 1 only if center, else faded
                        const opacityClass = isMobile ? "opacity-100 scale-100 blur-0" : (isCenter ? "opacity-100 scale-100 blur-0" : "opacity-40 scale-90 blur-sm");

                        const borderClass = isMobile || isCenter ? "border-orange-500/50 bg-white/10" : "border-white/10 bg-white/5";

                        return (
                            <div
                                key={i}
                                className="min-w-full md:min-w-[33.33%] px-4 md:px-6 flex justify-center items-center transition-all duration-500"
                            >
                                <div
                                    className={`
                                        relative p-8 rounded-3xl border backdrop-blur-xl w-full max-w-md
                                        flex flex-col gap-6
                                        transition-all duration-500 shadow-2xl
                                        ${opacityClass} ${borderClass}
                                    `}
                                >
                                    {/* Quote Icon */}
                                    <Quote className="absolute top-6 right-8 text-white/10 rotate-180" size={48} />

                                    {/* Profile */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full p-1 border border-white/20">
                                                <img
                                                    src={t.img}
                                                    alt={t.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-bold text-white">{t.name}</h3>
                                            <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider">{t.role}</p>
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                            <Star
                                                key={s}
                                                size={18}
                                                className={s < t.stars ? "fill-orange-500 text-orange-500" : "fill-gray-800 text-gray-800"}
                                            />
                                        ))}
                                    </div>

                                    {/* Feedback */}
                                    <p className="text-gray-300 leading-relaxed text-base md:text-lg italic text-left">
                                        "{t.feedback}"
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`transition-all duration-300 rounded-full ${i === index ? 'w-8 h-2 bg-orange-500' : 'w-2 h-2 bg-gray-600'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}