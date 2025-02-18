import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/app/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const components = {
  block: {
    h1: ({children}: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({children}: any) => (
      <p className="mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-primary dark:border-accent pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({children}: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}: any) => (
      <li className="ml-4">
        {children}
      </li>
    ),
    number: ({children}: any) => (
      <li className="ml-4">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({children}: any) => (
      <strong className="font-bold">
        {children}
      </strong>
    ),
    em: ({children}: any) => (
      <em className="italic">
        {children}
      </em>
    ),
    code: ({children}: any) => (
      <code className="bg-card/60 rounded px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary dark:text-accent hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({value}: any) => {
      const imageUrl = urlFor(value)?.width(800).url();
      return imageUrl ? (
        <img
          src={imageUrl}
          alt={value.alt || ''}
          className="rounded-lg my-6 w-full"
          loading="lazy"
        />
      ) : null;
    },
  },
}; 