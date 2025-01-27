import experienceData from '../app/data/work-experience.json'

export default function WorkExperience({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 bg-card">
      <div className="container mx-auto min-w-screen">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">WORK EXPERIENCE</h2>
        <div className="relative wrap overflow-hidden h-full bg-card dark:bg-card p-6">
          <div className="border-2-2 absolute border-black dark:border-white h-[75%] lg:h-[80&] m-0 p-0 border left-1/2"></div>

          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              className="bg-card rounded-lg px-0 sm:px-4 lg:px-6 border-border"
            >
                {index % 2 === 0 ? (
                  // RHS
                  <>
                    {/* <hr className='border-2-2 border-black dark:border-white w-1/12 left-1/2 my-8 lg:my-8 absolute'/> */}
                    <div className="mb-2 flex justify-between items-center w-auto z-10">
                      <div className="order-1 w-5/12"></div>
                      <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-accent shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto font-semibold text-xs lg:text-lg text-white dark:text-black">{exp.id}</h1>
                      </div>
                      <div className="order-1 bg-primary dark:bg-primary rounded-3xl shadow-xl w-5/12 px-2 md:px-6 pt-3 text-center md:text-left">
                        <h3 className="font-bold text-white text-xs md:text-sm lg:text-lg">{exp.title}</h3>
                        <div className='flex flex-wrap flex-col lg:flex-row mb-3'>
                          <h3 className="text-[10px] md:text-xs text-gray-200 lg:mr-auto">{exp.company}</h3>
                          <h3 className="text-gray-200 text-[10px] md:text-xs">{exp.duration}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // LHS
                  <>
                    {/* <hr className='border-2-2 border-black dark:border-white w-1/12 right-1/2 my-6 md:my-9 absolute z-0'/> */}
                    <div className="mb-2 flex justify-between flex-row-reverse items-center w-auto z-10">
                      <div className="order-1 w-5/12"></div>
                      <div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-accent shadow-xl w-8 h-8 rounded-full">
                        <h1 className="mx-auto font-semibold text-xs lg:text-lg text-white dark:text-black">{exp.id}</h1>
                      </div>
                      <div className="order-1 bg-primary dark:bg-primary rounded-3xl shadow-xl w-5/12 px-2 md:px-6 pt-3 text-center md:text-left">
                        <h3 className="font-bold text-white text-xs md:text-sm lg:text-lg">{exp.title}</h3>
                        <div className='flex flex-wrap flex-col lg:flex-row mb-3'>
                          <h3 className="text-[10px] md:text-xs text-gray-200 lg:mr-auto">{exp.company}</h3>
                          <h3 className="text-gray-200 text-[10px] md:text-xs">{exp.duration}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                )}


            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

