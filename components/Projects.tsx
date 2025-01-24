"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {Project} from '../lib/interfaces'
import Link from 'next/link'


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
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
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
              <div className="p-6 flex flex-row sm:gap-0 min-w-full">
                <div>
                  <Link href={`/projects/${project.slug}`} className="text-2xl font-semibold">{project.title}</Link>
                  <hr className='opacity-5 my-2'/>
                  <div>
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-primary/25 dark:bg-primary/10 dark:text-accent mx-1 px-2 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='ml-auto mr-24 lg:mr-20 md:mr-16 sm:mr-6 rounded-full border-2 p-4'>
                  <p className='text-right text-4xl md:text-2xl sm:text-xl'>{index+1}</p>
                </div>
              </div>
              <hr className='border opacity-50'/>
            </motion.div>
          ))
          }
        </div>
      </div>
    </section>
  )
}

