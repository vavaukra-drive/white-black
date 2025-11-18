import './App.css'
import Grid from './components/Grid'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import MobileMenu from './components/MobileMenu'

function App() {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  )
}

export default App
