'use client'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'

export default function Hero({ id }: { id?: string }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4 py- flex flex-col items-center text-center">
                    
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 animate-fade-in">
          <span className="gradient-text">Joel Dsouza </span>
        </h1>
        
        <h2 className="text-4xl md:text-6xl lg:text-4xl font-bold tracking-tighter mb-6">
          <span className="secondary-gradient-text">
            <Typewriter
                options={{
                  strings: ['Software Engineer', 'Data Scientist', 'Researcher'],
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,
                  wrapperClassName: 'secondary-gradient-text'
                }}
            />
          </span>
        </h2>

        <p className="max-w-[600px] text-muted-foreground text-lg mb-8 animate-slide-up">
          I create data-driven solutions that prioritize{' '}
          <span className="text-primary">efficiency</span>,{' '}
          <span className="text-accent">reliability</span> and{' '}
          <span className="text-secondary">scalability</span>.
        </p>
        <p className="max-w-[800px] text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          Results-oriented Software Engineer with expertise in ETL automation and data visualization, 
          prioritizing quality in all endeavors. Focused on enhancing team efficiency and automating data processes.
        </p>
        <Link
          href="#contact"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors animate-scale-in hover-lift"
          style={{animationDelay: '0.4s'}}
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

