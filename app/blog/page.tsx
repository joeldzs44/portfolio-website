'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import blogPosts from '../data/blog-posts.json'
import { ArrowRight, Calendar } from 'lucide-react'
import { BlogPost } from '@/lib/interfaces'
import BlogFilters from './BlogFilters'
import { useState } from 'react'

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts as BlogPost[])

  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center animate-fade-in mb-16">
            <h1 className="text-4xl font-bold font-baskervville text-primary dark:text-accent">// The Blog Corner.</h1>
            <p className="mt-4 max-w-2xl mx-auto">
              Exploring ideas, sharing insights, and documenting my journey in tech.
            </p>
          </div>

          {/* <hr className="my-8" /> */}

          <BlogFilters 
            posts={blogPosts as BlogPost[]} 
            onFilterChange={setFilteredPosts} 
          />

          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id}
                className="group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-card/40 hover:bg-card/60 transition-all duration-300 rounded-xl p-8 border border-primary/20 dark:border-accent/20 backdrop-blur-sm hover-move-right">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-semibold group-hover:text-primary dark:group-hover:text-accent transition-colors mb-3">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary dark:border-accent text-primary dark:text-accent group-hover:bg-primary dark:group-hover:bg-accent group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>

                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

