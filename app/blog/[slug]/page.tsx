import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { PortableText } from "@portabletext/react"
import { SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client } from "@/app/sanity/client"
import { components } from '@/lib/portable-text-components'

// Helper function to convert markdown-style content to Portable Text blocks
function convertToPortableText(content: string) {
  if (!content) return [];

  // Split content into paragraphs, preserving empty lines for spacing
  const paragraphs = content.split('\n').reduce((acc: string[], line: string) => {
    if (line.trim() === '') {
      if (acc.length > 0 && acc[acc.length - 1] !== '') {
        acc.push('');
      }
    } else {
      acc.push(line);
    }
    return acc;
  }, []);

  // Process paragraphs into blocks
  const blocks = paragraphs.map((text, index) => {
    // Skip empty lines but preserve paragraph breaks
    if (!text) {
      return {
        _type: 'block',
        _key: `block_${index}`,
        style: 'normal',
        children: [{
          _type: 'span',
          _key: `span_${index}`,
          text: '',
          marks: []
        }]
      };
    }

    let style = 'normal';
    text = text.trim();

    // Determine block style
    if (text.startsWith('# ')) {
      style = 'h1';
      text = text.substring(2);
    } else if (text.startsWith('## ')) {
      style = 'h2';
      text = text.substring(3);
    } else if (text.startsWith('### ')) {
      style = 'h3';
      text = text.substring(4);
    } else if (text.startsWith('> ')) {
      style = 'blockquote';
      text = text.substring(2);
    } else if (text === '---') {
      style = 'normal';
      text = '';
    }

    // Process inline markdown
    const parts = text.split(/(\*\*.*?\*\*)/g);
    const children = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return {
          _type: 'span',
          _key: `${index}_${partIndex}`,
          text: part.slice(2, -2),
          marks: ['strong']
        };
      }
      return {
        _type: 'span',
        _key: `${index}_${partIndex}`,
        text: part,
        marks: []
      };
    }).filter(child => child.text);

    return {
      _type: 'block',
      _key: `block_${index}`,
      style,
      children: children.length ? children : [{
        _type: 'span',
        _key: `${index}_0`,
        text,
        marks: []
      }]
    };
  });

  return blocks;
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  categories[]->{
    title,
    description
  },
  content[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
  mainImage,
  author->{
    name,
    image
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

  if (!post) {
    notFound()
  }

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).url()
    : null;

  // Process the content
  const rawText = Array.isArray(post.content) 
    ? post.content[0]?.children?.[0]?.text
    : (typeof post.content === 'object' 
      ? post.content[0]?.children?.[0]?.text 
      : post.content);

  const processedContent = convertToPortableText(rawText || '');

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
                {postImageUrl && (
                  <img
                    src={postImageUrl}
                    alt={post.title}
                    className="w-full max-h-[600px] object-contain"
                    width={1200}
                    height={800}
                  />
                )}
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold">{post.title}</h1>
                  <p className="text-md text-muted-foreground">{post.excerpt}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category: any) => (
                          <span 
                            key={`category-${category._id || category.title}`}
                            className="px-3 py-1 text-xs rounded-full text-primary dark:text-accent border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5"
                          >
                            {category.title}
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
                <PortableText 
                  value={processedContent}
                  components={components}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

