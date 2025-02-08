import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Project } from '../../lib/interfaces'
import { getAllProjects } from './utils'


export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        <div className="grid gap-8">
          {projects.map((project: Project) => (
            <article key={project.slug} className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
                  {project.title}
                </Link>
              </h2>
              <p className="text-muted-foreground">{project.description}</p>
              <Link href={`/projects/${project.slug}`} className="text-primary hover:underline mt-4 inline-block">
                View Project
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}