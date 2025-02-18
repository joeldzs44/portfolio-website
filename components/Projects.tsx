"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {Project} from '../lib/interfaces'
import Link from 'next/link'
import Tooltip from './Tooltip';
import { getAllProjects } from '@/app/projects/utils';

export default function Projects({ id }: { id?: string }) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadProjects() {
      const response = await getAllProjects();
      const dataTopThree = response.slice(0, 3);
      setProjects(dataTopThree);
    }

    loadProjects();
  }, []);

  return (
    <section id={id} className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-screen mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <h2 className="text-accent text-xs font-medium mb-3">PROJECTS</h2> */}
            <h3 className="text-primary dark:text-accent text-4xl font-bold font-baskervville">// Things I've built.</h3>
            <p className="mt-4">A showcase of my technical projects and creative endeavors.</p>
          </motion.div>
          
          <div className="space-y-2">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Link href={`/projects/${project.slug}`} className=''>
                  <div className="group relative bg-card hover:bg-card/80 transition-all duration-300 rounded-xl p-6 border border-border/50 hover-move-right">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-8">
                        <h4 className="text-xl font-semibold group-hover:text-accent dark:group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="mt-2 text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border bg-primary/10 dark:bg-accent/10 dark:border-accent/20 hover-zoom"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary dark:border-accent text-primary dark:text-accent hover:text-accent dark:hover:text-primary hover:border-accent dark:hover:border-primary transition-all duration-300">
                        <span className="text-lg font-medium">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

