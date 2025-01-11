"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
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
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="bg-card rounded-lg shadow-md overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image src={project.image} alt={project.title} width={100} height={100} className="w-auto mx-auto" />
              <div className="p-6">
                <Link href={`/projects/${project.slug}`} className="text-xl font-semibold mb-2">{project.title}</Link>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="prose prose-sm">
                  <span className=''>
                    {project.description}
                  </span>
                  {/* <ReactMarkdown>
                    {project.content.length > 200 ? `${project.content.substring(0, 200)}...` : project.content}
                  </ReactMarkdown>
                  {project.content.length > 200 && (
                    <Link href={`/projects/${project.slug}`} className="text-primary hover:underline">Read more</Link>
                  )} */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

