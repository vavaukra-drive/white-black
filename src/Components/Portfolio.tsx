import Grid from './Grid';
import Hero from './Hero';
import Marquee from './Marquee';
import Services from './Services';
import About from './About';
import Process from './Process';
import Stats from './Stats';
import Projects from './Projects';
import Contact from './Contact';
import ScrollProgress from './ScrollProgress';
import MobileMenu from './MobileMenu';

export default function Portfolio() {
  return (
    <div className="relative">
      <ScrollProgress />
      <MobileMenu />
      <Grid />
      <div id="home">
        <Hero />
      </div>
      <Marquee />
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <Process />
      <Stats />
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

