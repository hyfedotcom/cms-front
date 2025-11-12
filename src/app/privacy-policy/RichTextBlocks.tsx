"use client";

import * as React from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export function RichTextBlocks({ content }: { content: BlocksContent | null }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <article className="prose prose-slate max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p className="mb-4">{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
            return <Tag className="font-semibold mt-6 mb-3">{children}</Tag>;
          },
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
            ) : (
              <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
            ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-black my-4">
              {children}
            </blockquote>
          ),
        }}
      />
    </article>
  );
}
