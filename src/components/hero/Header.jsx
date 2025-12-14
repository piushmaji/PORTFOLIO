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
        <header className="flex justify-between items-center py-4 px-4 lg:px-20 sticky top-0 z-50 bg-black backdrop-blur-xl shadow-lg shadow-black/50">

            {/* Logo - Fixed z-index */}
            <a
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="text-3xl md:text-4xl lg:text-5xl font-light m-0 text-white relative z-[100]"
                href='#home'
            >
                PORTFOLIO
            </a>

            {/* Desktop Navigation - Now consistent with mobile */}
            <nav className="hidden md:flex items-center gap-12">
                {NAV_ITEMS.map((item, index) => (
                    <a
                        key={item}
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration={1000 + (index * 500)}
                        className="text-base tracking-wider transition-colors hover:text-orange-400 text-white"
                        href={`#${item.toLowerCase()}`}
                    >
                        {item.toUpperCase()}
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
                className={`fixed inset-0 w-screen h-screen z-[90] bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                <nav className="flex flex-col gap-8 w-full items-center">
                    {NAV_ITEMS.map((item, index) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={closeMenu}
                            className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white/80 hover:text-orange-500 hover:scale-110 transition-all duration-300 w-full text-center"
                            style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' }}
                        >
                            {item.toUpperCase()}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;