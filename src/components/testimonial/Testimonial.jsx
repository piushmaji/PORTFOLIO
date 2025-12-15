// Testimonial.jsx - Mobile Optimized with Swipe
import { useEffect, useState, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-scroll (DESKTOP ONLY)
    useEffect(() => {
        if (isPaused || isMobile) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [isPaused, isMobile, testimonials.length]);

    // Handle touch events for mobile swipe
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            // Swipe left - next
            setIndex((prev) => (prev + 1) % testimonials.length);
        }

        if (touchStartX.current - touchEndX.current < -50) {
            // Swipe right - previous
            setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    const nextTestimonial = () => {
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const active = testimonials[index];

    return (
        <section
            id="testimonial"
            className="w-full bg-black text-white py-16 md:py-24 px-4 relative overflow-hidden"
        >
            {/* Heading */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <span className="inline-block text-orange-400 text-sm font-light tracking-widest uppercase border border-orange-500/30 px-4 py-1.5 rounded-full mb-4">
                    What People Say
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Testimonials
                </h2>
                <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
                <p className="text-gray-400">
                    Feedback from people I've worked with
                </p>
            </div>

            {/* ================= MOBILE ================= */}
            {isMobile && (
                <div className="w-full px-4">
                    <div
                        className="relative"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange-500/20 hover:bg-orange-500/40 p-2 rounded-full backdrop-blur-sm transition-all active:scale-90"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange-500/20 hover:bg-orange-500/40 p-2 rounded-full backdrop-blur-sm transition-all active:scale-90"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>

                        {/* Active card with slide animation */}
                        <div className="overflow-hidden px-10">
                            <div
                                className="transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(0)` }}
                            >
                                <TestimonialCard data={active} mobile key={index} />
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`transition-all rounded-full ${i === index
                                            ? "w-8 h-2 bg-orange-500"
                                            : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                                        }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= DESKTOP ================= */}
            {!isMobile && (
                <div
                    className="relative w-full max-w-7xl mx-auto overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                            transform: `translateX(calc(-${index * 33.33}% + 33.33%))`,
                        }}
                    >
                        {testimonials.map((t, i) => {
                            const isCenter = i === index;

                            return (
                                <div
                                    key={i}
                                    className="min-w-[33.33%] px-6 flex justify-center"
                                >
                                    <TestimonialCard
                                        data={t}
                                        active={isCenter}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`transition-all rounded-full ${i === index
                                        ? "w-12 h-3 bg-orange-500"
                                        : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Background Effects */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
}

/* ================= CARD ================= */
function TestimonialCard({ data, active, mobile }) {
    return (
        <div
            className={`
                relative w-full ${mobile ? "max-w-full" : "max-w-md"} 
                ${mobile ? "p-6 gap-4 rounded-2xl" : "p-8 gap-6 rounded-3xl"}
                border backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-500
                ${mobile
                    ? "border-orange-500/50 bg-white/10 animate-fadeInUp"
                    : active
                        ? "opacity-100 scale-100 border-orange-500/50 bg-white/10"
                        : "opacity-40 scale-90 blur-sm border-white/10 bg-white/5"
                }
            `}
        >
            {/* Quote icon */}
            <Quote
                className={`absolute text-white/10 rotate-180 ${mobile ? "top-4 right-4 w-8 h-8" : "top-6 right-8 w-12 h-12"
                    }`}
            />

            {/* Profile */}
            <div className="flex items-center gap-4">
                <img
                    src={data.img}
                    alt={data.name}
                    className={`rounded-full object-cover border-2 border-orange-500/30 ${mobile ? "w-14 h-14" : "w-16 h-16"
                        }`}
                />
                <div>
                    <h3 className={`font-bold ${mobile ? "text-base" : "text-lg"}`}>
                        {data.name}
                    </h3>
                    <p className={`text-orange-400 uppercase ${mobile ? "text-xs" : "text-xs"}`}>
                        {data.role}
                    </p>
                </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={mobile ? 16 : 18}
                        className={
                            i < data.stars
                                ? "fill-orange-500 text-orange-500"
                                : "fill-gray-800 text-gray-800"
                        }
                    />
                ))}
            </div>

            {/* Feedback */}
            <p className={`italic text-gray-300 leading-relaxed ${mobile ? "text-sm" : "text-base"
                }`}>
                "{data.feedback}"
            </p>

            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500/20 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-500/20 rounded-bl-2xl"></div>
        </div>
    );
}

// Add keyframe animation in your CSS or style tag
const styles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.5s ease-out;
}
`;