import experienceData from '../app/data/work-experience.json'

export default function WorkExperience({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-card/10 py-8">
      <div className="container backdrop-blur-xs mx-auto flex flex-col items-center lg:items-start lg:flex-row my-12 md:my-24 max-w-[90%]">
        <div className="flex flex-col w-full text-center lg:text-left lg:w-1/3 mt-2 md:mt-12 px-4 lg:px-8">
          {/* <p className="text-accent uppercase tracking-loose">Career Journey</p> */}
          <h2 className="text-3xl leading-normal md:leading-relaxed mb-2 font-baskervville font-semibold text-primary dark:text-accent">// My journey so far.</h2>
          <p className="text-sm md:text-base mb-4">
            Here's a timeline of my professional experience and the amazing companies I've had the privilege to work with.
          </p>
        </div>
        
        <div className="w-full lg:w-2/3 px-4 lg:px-0 lg:ml-12 py-12">
          <div className="relative">
            <div 
              className="hidden lg:block absolute border-2 border-accent left-1/2 h-full z-0 -translate-x-1/2"
            />

            {/* <span className="hidden lg:block bg-accent text-black px-2 py-1 rounded-full absolute left-1/2 z-1 -translate-x-1/2 -bottom-8"> start </span> */}

            {/* Vertical line for mobile */}
            <div 
              className="lg:hidden absolute border-2 border-accent left-5 h-full z-0"
            />
            
            {experienceData.map((exp, index) => (
              <div 
                key={exp.id} 
                className="relative flex items-center mb-6"
              >
                {/* Mobile layout */}
                <div className="lg:hidden flex flex-1 ml-12">
                  <div className="absolute left-[-24px] z-20 flex items-center justify-center bg-accent shadow-xl w-8 h-8 rounded-full">
                    <span className="font-semibold text-black text-xs">{exp.id}</span>
                  </div>
                  <div className="bg-card/10 backdrop-blur-sm rounded-lg p-4 w-full">
                    <p className="text-primary dark:text-accent">{exp.duration}</p>
                    <h4 className="font-semibold text-sm md:text-lg mb-2">{exp.title} - <span className='text-xs text-muted-foreground'>{exp.company}</span></h4>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className={`hidden lg:flex justify-between items-center w-full ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}>
                  <div className="w-5/12"></div>
                  <div className="z-20 flex items-center justify-center bg-accent shadow-xl w-8 h-8 rounded-full hover-lift">
                    <span className="font-semibold text-xs text-black">{exp.id}</span>
                  </div>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right hover-move-left' : 'text-left hover-move-right'}`}>
                    <div className="backdrop-blur-sm rounded-lg p-4">
                      <p className="text-primary dark:text-accent">{exp.duration}</p>
                      <p className="font-semibold text-md">{exp.title} - <span className='text-sm'>{exp.company}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

