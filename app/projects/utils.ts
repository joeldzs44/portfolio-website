'use server'

// FETCHERS https://www.youtube.com/watch?v=0pEbT-NwmHk

import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

interface ProjectFrontmatter {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const projectsDirectory = path.join(process.cwd(), 'app/data/content/projects')

export async function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '').replace(/\.md$/, '')
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`)
  
  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const mdxSource = await serialize(content)
    return {
      slug: realSlug,
      frontmatter: data as ProjectFrontmatter,
      content: mdxSource,
      status: 200
    }
  }

  return {
    slug: realSlug,
    frontmatter: null,
    content: null,
    status: 404
  }
}

export async function getAllProjects() {
  const files = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(
    files.map(async (filename, index) => {
      const slug = filename.replace(/\.mdx$/, '').replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        id: index,
        title: data.title,
        description: data.description,
        image: data.image,
        technologies: data.technologies,
        content
      }
    })
  )

  return projects
}