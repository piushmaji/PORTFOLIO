import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

// Extract navigation items as constants
const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Testimonial', 'Contact'];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Smooth scroll function
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        closeMenu();

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerOffset = 80; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeMenu();
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header className="flex justify-between items-center py-4 px-4 lg:px-20 sticky top-0 z-50 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50 border-b border-white/5">

            {/* Logo */}
            <a
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="text-3xl md:text-4xl lg:text-5xl font-light m-0 text-white relative z-[100]"
                href='#home'
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                PORTFOLIO
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
                {NAV_ITEMS.map((item, index) => (
                    <a
                        key={item}
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration={1000 + (index * 500)}
                        className="text-base tracking-wider transition-all duration-300 hover:text-orange-400 text-white relative group"
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => handleNavClick(e, item.toLowerCase())}
                    >
                        {item.toUpperCase()}
                        {/* Animated underline */}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className='md:hidden text-white text-3xl p-2 z-[100] relative transition-transform duration-300 hover:scale-110 active:scale-90'
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Full Screen Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 w-screen h-screen z-[90] bg-black  flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                <nav className="flex flex-col gap-8 w-full items-center">
                    {NAV_ITEMS.map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={(e) => handleNavClick(e, item.toLowerCase())}
                            className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white/80 hover:text-orange-500 hover:scale-110 transition-all duration-300 w-full text-center relative group"
                            style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                        >
                            {item.toUpperCase()}
                            {/* Mobile underline effect */}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-24 transition-all duration-300 rounded-full"></span>
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;