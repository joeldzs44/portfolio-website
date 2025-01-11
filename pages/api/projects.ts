import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const projectsDirectory = path.join(process.cwd(), 'app/data/content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames.map((filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: filename.replace(/\.md$/, ''),
      title: data.title,
      slug: data.slug,
      description: data.description,
      image: data.image,
      technologies: data.technologies,
      content,
    };
  });

  res.status(200).json(projects);
}