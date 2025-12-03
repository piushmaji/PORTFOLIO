import { ExternalLink, Gem, Link, Menu, } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import Header from './Header'
const Hero = () => {
    return (
        <>
            <Header />
            <main className=" flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">

                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine" className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:-mt-24 ">
                    <div className='relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full '>
                        <div className='absolute  inset-[3px] bg-black rounded-full flex items-center justify-center gap-1'>
                            <Gem /> INTRODUCING
                        </div>
                    </div>

                    {/* Main Div */}
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8'>
                        HEY, GUYS <br />
                        PIUSH MAJI
                    </h1>

                    {/* Description */}
                    <p className='text-base sm:text-lg tracking-wider text-gray-400 max-w-100 lg:max-w-120 '>“Engineer in training, building practical solutions with clean design and solid logic”</p>
                    {/* Buttons */}
                    <div className='flex gap-4 mt-12'>
                        <a className='border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] flex gap-2' href="#">
                            RESUME
                            <Link />
                        </a>

                        <a className='border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white flex gap-2' href="#">
                            GET STARTED
                            <ExternalLink />
                        </a>
                    </div>
                </div>

                {/* 3D Robot */}
                <Spline data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="300"
                    data-aos-offset="0"
                    data-aos-duration="3000" className='absolute lg:-top-16 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full  ' scene="https://prod.spline.design/aEU1Qa8YH7g0fdcE/scene.splinecode" />
            </main>
        </>
    )
}

export default Hero
