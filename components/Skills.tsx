'use client'

import skillsData from '../app/data/skills.json'
import { motion } from 'framer-motion'
import {Code, Bot, ApertureIcon} from 'lucide-react'

export default function Skills({ id }: { id?: string }) {
  return (
    <section id={id} className="py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto backdrop-blur-sm py-12">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl leading-normal md:leading-relaxed font-baskervville font-semibold text-primary dark:text-accent">// The Skill Wall.</h2>
            <p className="-mt-2 text-[11px]">
              <span className="font-mono">{"> p.s."}</span> its ever growing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCategory 
              title="Development" 
              skills={skillsData.Development} 
              delay={0} 
              Icon={Code}
            />
            <SkillCategory 
              title="AI/ML" 
              skills={skillsData['AI/ML']} 
              delay={0.2} 
              Icon={Bot}
            />
            <SkillCategory 
              title="Other" 
              skills={skillsData.Other} 
              delay={0.4} 
              Icon={ApertureIcon}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCategory({ title, skills, delay, Icon}: { title: string, skills: string[], delay: number, Icon: React.ElementType }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="h-full bg-card/40 transition-all duration-300 rounded-xl p-8 border border-primary/20 dark:border-accent/20 hover-lift hover:cursor-pointer backdrop-blur-sm">
        <div className="">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 mx-auto">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-center transition-colors">
            {title}
          </h3>
        </div>
        <hr className="border-primary/20 dark:border-accent/20 my-4" />
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5 hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

