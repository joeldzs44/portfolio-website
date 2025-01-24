import { Bot, WholeWord, ChartScatter, Code } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'Gen AI',
    description: 'Build custom cutting-edge scalable Gen AI solutions for tailoerd to your unique business problems for maximum impact. Harness the power of AI to innovate, optimize, and elevate your operations.'
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
    <section id={id} className="py-20 bg-card mx-auto">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 animate-fade-in">WHAT I DO</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors animate-scale-in hover-lift"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <service.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

