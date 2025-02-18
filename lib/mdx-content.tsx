'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PortableText } from "@portabletext/react";
import { components } from './portable-text-components';

interface MDXContentProps {
  content: MDXRemoteSerializeResult | any;
  type?: 'mdx' | 'portable-text';
}

export default function MDXContent({ content, type = 'mdx' }: MDXContentProps) {
  if (!content) {
    console.error('Content is undefined in MDXContent');
    return <div>Error: Content is missing</div>;
  }

  // Handle Portable Text (Sanity) content
  if (type === 'portable-text') {
    return <PortableText value={content} components={components} />;
  }

  // Handle MDX content
  if (!content.compiledSource) {
    console.error('compiledSource is missing in content');
    return <div>Error: Compiled source is missing</div>;
  }

  return (
    <MDXRemote 
      {...content}
      compiledSource={content.compiledSource} 
      frontmatter={content.frontmatter} 
      scope={content.scope} 
    />
  );
}