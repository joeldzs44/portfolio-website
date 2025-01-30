'use client'

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { Project } from '../../../lib/interfaces';

import ReactMarkdown from 'react-markdown';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects:', response.statusText);
      }
      setLoading(false);
    }

    loadProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen my-16 flex flex-col mt-16">
        <main className="flex-grow container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <div className="content dark:prose-invert max-w-none">
                <ReactMarkdown className='[all: unset]'>
                    {project.content}
                </ReactMarkdown>
            </div>
            <Link href="/projects" className="text-primary hover:underline mt-8 inline-block">
              ← Back to all projects
            </Link>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
}