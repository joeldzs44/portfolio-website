'use client'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import Image from 'next/image'
import portrait from './../app/data/content/photos/portrait_circle.png'

export default function Hero({ id }: { id?: string }) {

  const handleDownloadCV = async () => {
    try {
      const response = await fetch('/api/resume', {
        method: 'GET',
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Joel_Dsouza_CV.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to download CV');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id={id} className="min-h-screen flex items-center justify-center pt-16">
      <div className="container px-4 py-4 flex flex-col items-center text-center">

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

        <p className="max-w-[600px] text-md mb-8 animate-slide-up md:leading-normal leading-relaxed">
          from 📍🗺️ <span className='font-baskervville india-gradient'>Mumbai, India.</span> I create data-driven solutions that prioritize{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">efficiency</span>,{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">reliability</span> and{' '}
          <span className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-2 py-1 rounded-full text-sm">scalability</span>.
        </p>
        <div className='flex flex-col md:flex-row gap-4'>
          <Link
            href="#contact"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors animate-scale-in hover-zoom"
            style={{animationDelay: '0.4s'}}
          >
            Get in Touch
          </Link>

          <Link
            href="#"
            onClick={handleDownloadCV}
            className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors animate-scale-in hover-zoom"
            style={{ animationDelay: '0.4s' }}
            target="_self"
          >
            Download CV
          </Link>

        </div>
      </div>
    </section>
  )
}

