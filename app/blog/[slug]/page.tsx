import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import blogPosts from '../../data/blog-posts.json'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import MDXContent from '@/lib/mdx-content'
import type { BlogPost } from '@/lib/interfaces'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug) as BlogPost

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="animate-fade-in">
            {/* Header Card */}
            <div className="bg-card/40 border border-primary/20 dark:border-accent/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold">{post.title}</h1>
                  <p className="text-lg text-muted-foreground">{post.excerpt}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    5 min read
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="mt-8 bg-card/40 border border-primary/20 dark:border-accent/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-pre:bg-card prose-pre:border prose-pre:border-primary/20 dark:prose-pre:border-accent/20">
                {/* Temporary content rendering until MDX is implemented */}
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

