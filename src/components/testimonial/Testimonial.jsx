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

    const active = testimonials[index];

    return (
        <section
            id="testimonial"
            className="w-full bg-black text-white py-16 md:py-24 px-4 relative"
        >
            {/* Heading */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Testimonials
                </h2>
                <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
                <p className="text-gray-400">
                    What people are saying about my work
                </p>
            </div>

            {/* ================= MOBILE ================= */}

            {isMobile && (
                <div className="w-full px-4">
                    <div className="relative">
                        {/* Active card */}
                        <TestimonialCard data={active} mobile />

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-4">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`transition-all rounded-full ${i === index ? "w-8 h-2 bg-orange-500" : "w-2 h-2 bg-gray-600"
                                        }`}
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
                </div>
            )}
        </section>
    );
}

/* ================= CARD ================= */

function TestimonialCard({ data, active, mobile }) {
    return (
        <div
            className={`
            relative w-full ${mobile ? "max-w-full" : "max-w-md"} 
            ${mobile ? "p-4 gap-3 rounded-2xl" : "p-8 gap-6 rounded-3xl"}
            border backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-500
            ${mobile
                    ? "border-orange-500/50 bg-white/10 animate-mobileFade"
                    : active
                        ? "opacity-100 scale-100 border-orange-500/50 bg-white/10"
                        : "opacity-40 scale-90 blur-sm border-white/10 bg-white/5"
                }
            `}
        >
            {/* Quote icon */}
            <Quote
                className={`absolute text-white/10 rotate-180 ${mobile ? "top-3 right-3 w-6 h-6" : "top-6 right-8 w-12 h-12"
                    }`}
            />

            {/* Profile */}
            <div className="flex items-center gap-3">
                <img
                    src={data.img}
                    alt={data.name}
                    className={`rounded-full object-cover ${mobile ? "w-12 h-12" : "w-16 h-16"}`}
                />
                <div>
                    <h3 className={`font-bold ${mobile ? "text-sm" : "text-lg"}`}>{data.name}</h3>
                    <p className={`text-orange-400 uppercase ${mobile ? "text-[10px]" : "text-xs"}`}>
                        {data.role}
                    </p>
                </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={mobile ? 14 : 18}
                        className={
                            i < data.stars
                                ? "fill-orange-500 text-orange-500"
                                : "fill-gray-800 text-gray-800"
                        }
                    />
                ))}
            </div>

            {/* Feedback */}
            <p className={`italic text-gray-300 ${mobile ? "text-sm leading-snug" : "text-base leading-relaxed"}`}>
                "{data.feedback}"
            </p>
        </div>
    );
}


