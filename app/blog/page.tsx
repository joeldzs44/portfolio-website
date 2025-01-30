import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import blogPosts from '../data/blog-posts.json'

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col mt-16">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">{post.date}</p>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline mt-4 inline-block">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

