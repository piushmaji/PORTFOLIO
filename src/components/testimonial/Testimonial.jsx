import { useEffect, useState } from "react";

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

    const [index, setIndex] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 2500);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section id="testimonial" className="w-full bg-black text-white py-20 px-6 -scroll-mt-16">
            <h2 className="text-center text-4xl font-bold mb-14">
                Testimonials
                <span className="block text-orange-400 text-lg font-light">
                    What People Say
                </span>
            </h2>

            {/* VIEWPORT */}
            <div className="relative w-full overflow-hidden">

                {/* TRACK */}
                <div
                    className="flex transition-all duration-700 ease-out"
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
                                <div
                                    className={`
                    p-8 rounded-3xl border backdrop-blur-lg max-w-md w-full
                    transition-all duration-500
                    ${isCenter
                                            ? "bg-white/10 border-orange-400 blur-0 opacity-100"
                                            : "bg-white/5 border-white/10 blur-sm opacity-40"
                                        }
                  `}
                                >
                                    {/* Profile */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={t.img}
                                            alt=""
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{t.name}</h3>
                                            <p className="text-orange-400 text-sm">{t.role}</p>
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div className="flex mb-3">
                                        {Array.from({ length: t.stars }).map((_, s) => (
                                            <span key={s} className="text-orange-400 text-xl">★</span>
                                        ))}
                                        {Array.from({ length: 5 - t.stars }).map((_, s) => (
                                            <span key={s} className="text-gray-600 text-xl">★</span>
                                        ))}
                                    </div>

                                    {/* Feedback */}
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        “{t.feedback}”
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
