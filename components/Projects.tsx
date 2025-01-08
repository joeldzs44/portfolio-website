import Image from 'next/image'
import projectsData from '../app/data/projects.json'

export default function Projects({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className="bg-card rounded-lg shadow-md overflow-hidden animate-scale-in hover-lift"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <Image src={project.image} alt={project.title} width={400} height={200} className="w-full" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

