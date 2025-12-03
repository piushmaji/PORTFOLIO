import React from 'react';
import WorkExperience from './WorkExperience';

export default function InfiniteScrollSkills() {
    const skills = [
        {
            name: "HTML",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
        },
        {
            name: "CSS",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        },
        {
            name: "JavaScript",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        },
        {
            name: "React",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        },
        {
            name: "Node.js",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        },
        {
            name: "MongoDB",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
        },
        {
            name: "Git",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        },
        {
            name: "Tailwind",
            url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
        }
    ]

    const duplicatedSkills = [...skills, ...skills, ...skills];

    return (
        <section id='skills' className='min-h-screen scroll-mt-16'>
            <div className="min-h-1 bg-black flex items-center justify-center overflow-hidden">
                <div className="w-full">
                    <div className="relative py-12">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                        <div className="flex gap-20 animate-scroll-smooth">
                            {duplicatedSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 flex items-center justify-center transition-all duration-500 ease-in-out grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                                >
                                    <img
                                        src={skill.url}
                                        alt={skill.name}
                                        className="h-14 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style jsx>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 20s linear infinite;
          will-change: transform;
        }

        .animate-scroll-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>
            </div>
            <WorkExperience />
        </section>
    );
}