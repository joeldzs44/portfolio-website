import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllProjects } from './utils'
import ProjectsList from './ProjectsList'

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center animate-fade-in">
            <h1 className="text-4xl font-bold font-baskervville text-primary dark:text-accent">// The Project Board.</h1>
            <p className="mt-4 max-w-2xl mx-auto">
              A comprehensive showcase of my technical projects and creative endeavors.
            </p>
          </div>

          <ProjectsList initialProjects={projects} />
        </div>
      </main>
      <Footer />
    </div>
  )
}