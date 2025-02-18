import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXContent from '@/lib/mdx-content';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '../utils';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectPage({params}: {params: { slug: string }}) {
  params = await params
  const { slug, frontmatter, content, status } = await getProjectBySlug(params.slug);

  if (status === 404) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          {frontmatter && (
            <div className="animate-fade-in">
              <div className="bg-card/40 border border-primary/20 dark:border-accent/20 rounded-xl p-8 backdrop-blur-sm">
                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image 
                      src={frontmatter.image} 
                      alt={frontmatter.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
                    <p className="text-lg text-muted-foreground">{frontmatter.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.technologies.map((tech: string) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
                    <p className="text-lg text-muted-foreground">{frontmatter.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.technologies.map((tech: string) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image 
                      src={frontmatter.image} 
                      alt={frontmatter.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex flex-row gap-4 mt-6 pt-6 border-t border-primary/20 dark:border-accent/20">
                  {/* Link to the project source code*/}
                  {frontmatter.link && (
                    <div className="">
                      <a 
                        href={frontmatter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary dark:text-accent hover:underline"
                      >
                        <Code className="w-4 h-4" />
                        Source Code
                      </a>
                    </div>
                  )}
                  
                  {/* Link to the live demo*/}
                  {frontmatter.demo && (
                    <div className="">
                      <a 
                        href={frontmatter.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary dark:text-accent hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {content && (
                <div className="mt-8 bg-card/40 border border-primary/20 dark:border-accent/20 rounded-xl p-8 backdrop-blur-sm">
                  <div className="prose dark:prose-invert max-w-none">
                    <MDXContent content={content} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}