import { BarChart3, Database, LineChart, Workflow } from 'lucide-react'

const services = [
  {
    icon: Database,
    title: 'ETL Automation',
    description: 'Building efficient data pipelines and automated workflows using Azure cloud services.'
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description: 'Creating insightful Power BI dashboards and reports for data-driven decision making.'
  },
  {
    icon: Workflow,
    title: 'Process Optimization',
    description: 'Streamlining workflows and enhancing team productivity through automation.'
  },
  {
    icon: LineChart,
    title: 'Performance Analysis',
    description: 'Optimizing data models and improving system performance metrics.'
  }
]

export default function Services({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 bg-card">
      <div className="container px-4">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">WHAT I DO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-colors animate-scale-in hover-lift"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <service.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

