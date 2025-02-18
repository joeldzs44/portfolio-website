import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { client } from '@/app/sanity/client'
import { SanityDocument } from 'next-sanity'
import BlogList from './BlogList'

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  tags
}`;

const options = { next: { revalidate: 30 } };

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

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

          <BlogList initialPosts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

