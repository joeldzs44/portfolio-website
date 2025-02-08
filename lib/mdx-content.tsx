'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function MDXContent({ content }: { content: MDXRemoteSerializeResult }) {
  if (!content) {
    console.error('Content is undefined in MDXContent');
    return <div>Error: Content is missing</div>;
  }

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