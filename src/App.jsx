import { useEffect } from 'react';
import Header from './components/hero/Header'
import Hero from './components/hero/Hero'
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import ProjectsShowcase from './components/projects/ProjectsShowcase';
import Testimonial from './components/testimonial/Testimonial';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import SmoothScroll from './SmoothScroll';
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    })
  })
  return (
    <main>
      <SmoothScroll />
      {/* Gradient image */}

      <img className='absolute top-0 right-0 opacity-60 -z-1' src="/gradient.png" alt="gradient-img" />

      {/* Blur effect */}
      <div className='h-0 w-160 absolute top-[25%] right-[-5%] shadow-[0_0_900px_15px_#e99b63] -rotate-30 -z-10'>
      </div>
      <Header />
      <Hero />
      <About />
      <Skills />
      <ProjectsShowcase />
      <Testimonial />
      <Contact />
      <Footer />
    </main>
  )
}

export default App