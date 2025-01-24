'use client'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import Image from 'next/image'
import portrait from './../app/data/content/photos/portrait_circle.png'
import { MapPin } from 'lucide-react'

export default function Hero({ id }: { id?: string }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4 py- flex flex-col items-center text-center">

        <Image
          src={portrait}
          alt="Profile Picture"
          className="rounded-full w-auto h-auto max-w-40 max-h-40 mb-8 animate-fade-in"
        />
                    
        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold tracking-tighter mb-2 animate-fade-in">
          <span className="gradient-text">Joel Dsouza </span>
        </h1>
        
        <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold tracking-tighter mb-2">
          <span className="flex"> 
            <p className='mx-2'>a</p>
            <Typewriter
                options={{
                  strings: ['Software Engineer', ' Data Scientist', ' Researcher', ' Developer'],
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,
                  wrapperClassName: 'accent-gradient-text',
                  cursor: '|',
                  cursorClassName: 'accent-gradient-text blink',
                }}
            />
          </span>
        </h2>

        <p className="max-w-[600px] text-md mb-8 animate-slide-up">
          from 📍🗺️ Mumbai, India. I create data-driven solutions that prioritize{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">efficiency</span>,{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">reliability</span> and{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">scalability</span>.
        </p>
        {/* <p className="max-w-[800px] text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          Results-oriented Software Engineer with expertise in ETL automation and data visualization, 
          prioritizing quality in all endeavors. Focused on enhancing team efficiency and automating data processes.
        </p> */}
        <Link
          href="#contact"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors animate-scale-in hover-lift"
          style={{animationDelay: '0.4s'}}
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}

