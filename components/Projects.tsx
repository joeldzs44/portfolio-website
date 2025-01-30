"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {Project} from '../lib/interfaces'
import Link from 'next/link'
import Tooltip from './Tooltip';

export default function Projects({ id }: { id?: string }) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch('/api/projects');
      const data = await response.json();
      const dataTopThree = data.slice(0, 3);
      setProjects(dataTopThree);
    }

    loadProjects();
  }, []);

  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-0">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center font-baskervville"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Things I've built.
        </motion.h2>
        
        
        <div className="grid grid-cols-1 grid-rows-3 gap-0">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="bg-card rounded-lg shadow-md overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* ADD Description as a tooltip */}
              {/* Further Optimization needed for screens width < 670px */}
              <Tooltip message={project.description}>
                <div className="p-6 flex flex-row gap-0 min-w-full">
                  <div>
                    <Link href={`/projects/${project.slug}`} className="xl:text-2xl md:text-xl text-lg font-semibold">{project.title}</Link>
                    <hr className='opacity-5 lg:my-2 md:my-1 my-0'/>
                    <div className='flex flex-wrap gap-2'>
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-primary/25 dark:bg-secondary/10 text-primary dark:text-secondary px-1 py-1 rounded-full text-xs mr-auto">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='ml-auto xl:mr-24 lg:mr-20 md:mr-16 mr-0'>
                    <p className='texl-xl xl:text-4xl md:text-2xl rounded-full border-2 p-3'>{index+1}</p>
                  </div>
                </div>
              </Tooltip>
              <hr className='border opacity-50'/>
              </motion.div>
          ))
          }
        </div>
      </div>
    </section>
  )
}

