import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXContent from '@/lib/mdx-content';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '../utils';


export default async function ProjectPage({params}: {params: { slug: string }}) {
  params = await params
  const { slug, frontmatter, content, status } = await getProjectBySlug(params.slug);

  if (status === 404) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col mt-16 mx-0">
      <Header />
      <div className="mx-auto mb-10 w-[90%] lg:w-[70%]">
          {frontmatter && (
            <>
              {/* mobile version */}
              <div className="md:hidden flex flex-col mx-auto min-w-full justify-between">
                <div className='mx-auto mb-5'>
                  <Image className='mr-auto' src={frontmatter.image} alt={frontmatter.title} width={300} height={300}/>
                </div>
                <div className='text-center'>
                  <p className="text-3xl font-bold mb-4">{frontmatter.title}</p>
                  <p className="text-lg text-muted-foreground mb-4">{frontmatter.description}</p>
                  <p className="flex flex-wrap gap-2 justify-center">
                    {frontmatter.technologies.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 rounded-3xl text-sm border dark:border-border dark:bg-border/90">{tech}</span>
                    ))}
                  </p>
                </div>
              </div>

              {/* for larger screens */}
              <div className="hidden md:flex md:flex-row mx-auto min-w-full justify-between">
                <div>
                  <p className="text-3xl font-bold mb-4">{frontmatter.title}</p>
                  <p className="text-lg text-muted-foreground mb-4">{frontmatter.description}</p>
                  <p className="flex flex-wrap gap-2">
                    {frontmatter.technologies.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 rounded-3xl text-sm border dark:border-border dark:bg-border/90">{tech}</span>
                    ))}
                  </p>
                </div>
                <div>
                  <Image className='mr-auto' src={frontmatter.image} alt={frontmatter.title} width={300} height={300}/>
                </div>
              </div>
            </>
          )}
          <hr className='my-4'/>
          {content && (
            <div className="prose dark:prose-invert max-w-none">
              <MDXContent content={content} />
            </div>  
          )}
      </div>
      <Footer />
    </div>
  )
}