import './App.css'
import Grid from './Components/Grid'
import Hero from './Components/Hero'
import Marquee from './Components/Marquee'
import Services from './Components/Services'
import About from './Components/About'
import Process from './Components/Process'
import Stats from './Components/Stats'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import ScrollProgress from './Components/ScrollProgress'
import MobileMenu from './Components/MobileMenu'

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
