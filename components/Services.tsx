"use client";

import { Bot, WholeWord, ChartScatter, Code } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Bot,
    title: 'Gen AI',
    description: 'Build custom cutting-edge scalable Gen AI solutions for tailored to your unique business problems for maximum impact. Harness the power of AI to innovate, optimize, and elevate your operations.'
  },
  {
    icon: WholeWord,
    title: 'NLP',
    description: 'Tackle challenging natural language processing problems with state-of-the-art NLP models. Extract insights from unstructured text data and automate text processing tasks.'
  },
  {
    icon: ChartScatter,
    title: 'Data Visualization',
    description: 'Create interactive and visually appealing data visualizations to help you understand your data better and communicate insights effectively using Power BI.'
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Develop high-quality applications optimized for enterprise grade customers. Build web applications, APIs, and data pipelines to help you achieve your business goals.'
  },
]

export default function Services({ id }: { id?: string }) {
  return (
    <section id={id} className="py-12 mt-12 max-w-screen">
      <div className="container mx-auto">
        <div className="mx-auto backdrop-blur-sm p-4 rounded-xl">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* <h2 className="text-accent text-lg font-medium mb-3">SERVICES</h2> */}
            <h3 className="text-4xl font-bold font-baskervville text-primary dark:text-accent">// Things I do.</h3>
            <p className="mt-4 max-w-2xl">
              Specialized expertise in cutting-edge technologies to help businesses innovate and grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group relative animation-scale-in hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ transform: 'translateY(-10px)' }}
              >
                <div className="h-full bg-card hover:bg-card/80 transition-all duration-300 rounded-xl p-8 border border-border/50 flex flex-col">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-accent"/>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm flex-grow">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

