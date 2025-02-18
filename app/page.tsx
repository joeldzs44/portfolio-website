import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import WorkExperience from '@/components/WorkExperience'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"
import ScrollToTopButton from '@/components/ScrollToTopButton'
import ThreeScene from '@/components/ThreeScene'

export default function Home() {

  return (
    <>
      <Analytics />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero id="hero" />
          <Services id="services" />
          <Projects id="projects" />
          <WorkExperience id="experience" />
          <Skills id="skills" />
          <ContactForm id="contact" />
          <ThreeScene />
          <ScrollToTopButton />
        </main>
        <Footer />
      </div>
    </>
  )
}

