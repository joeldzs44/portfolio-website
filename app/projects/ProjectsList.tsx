'use client'

import { useState } from 'react'
import { Project } from '@/lib/interfaces'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectFilters from './ProjectFilters'

export default function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [filteredProjects, setFilteredProjects] = useState(initialProjects)

  return (
    <>
      <ProjectFilters 
        projects={initialProjects}
        onFilterChange={setFilteredProjects}
      />

      <div className="space-y-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No projects match your filter criteria.
          </div>
        ) : (
          filteredProjects.map((project: Project, index: number) => (
            <article 
              key={project.slug}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="bg-card/40 hover:bg-card/60 transition-all duration-300 rounded-xl p-8 border border-primary/20 dark:border-accent/20 backdrop-blur-sm hover-move-right">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8">
                      <h2 className="text-2xl font-semibold group-hover:text-primary dark:group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5 hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors hover-zoom"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary dark:border-accent text-primary dark:text-accent group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </>
  )
} 