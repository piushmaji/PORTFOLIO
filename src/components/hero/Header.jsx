import { Menu } from 'lucide-react'
const Header = () => {

    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu')
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden')
        }
    }

    return (
        <header className="flex justify-between items-center py-4 px-4 lg:px-20 sticky top-0 z-50 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/50 ">

            <a data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500" className="text-3xl md:text-4xl lg:text-5xl font-light m-0 "
                href=''>PORTFOLIO</a>

            {/* Desktop Navigation */}

            <nav className="hidden md:flex items-center gap-12 ">
                <a
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    className="text-base tracking-wider transition-colors hover:text-orange-400 z-50"
                    href="#about"
                >
                    ABOUT
                </a>

                <a
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="text-base tracking-wider transition-colors hover:text-orange-400 z-50"
                    href="#skills"
                >
                    SKILLS
                </a>

                <a
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="2000"
                    className="text-base tracking-wider transition-colors hover:text-orange-400 z-50"
                    href="#projects"
                >
                    PROJECTS
                </a>

                <a
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="text-base tracking-wider transition-colors hover:text-orange-400 z-50"
                    href="#testimonial"
                >
                    TESTIMONIAL
                </a>

                <a
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="2500"
                    className="text-base tracking-wider transition-colors hover:text-orange-400 z-50"
                    href="#contact"
                >
                    CONTACT
                </a>
            </nav>


            {/* Mobile Menu BUtton-Visible only on Mobile */}
            <button onClick={toggleMobileMenu} className='md:hidden text-3xl p-2 z-50'>
                <Menu />
            </button>

            {/* Mobile Menu- Hidden by default */}
            <div id='mobileMenu' className='fixed top-16 bottom-0 right-0 left-0 p-5 hidden z-50 bg-black bg-opacity-70 backdrop-blur-md'>
                <nav className="flex flex-col gap-6 items-center ">
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#home">HOME</a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#about">ABOUT</a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#resume">RESUME</a>
                    <a className="text-base tracking-wider transition-colors hover:text-gray-300 z-50" href="#contact">CONTACT</a>
                </nav>


            </div>
        </header>

    )
}

export default Header
