import type { Metadata } from "next";
import BlogPostPage from "@/src/views/BlogPostPage";
import { siteConfig } from "@/src/lib/metadata";

type Props = {
  params: Promise<{ "blog-slug": string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "blog-slug": slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const json = await res.json();
      const post = json?.data;
      if (post) {
        return {
          title: post.title,
          description: post.excerpt || post.title,
          alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
          openGraph: {
            title: post.title,
            description: post.excerpt || post.title,
            url: `${siteConfig.url}/blog/${slug}`,
            type: "article",
            publishedTime: post.publishDate,
            images: [
              {
                url: post.image || "/logo-bg.png",
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || post.title,
            images: [post.image || "/logo-bg.png"],
          },
        };
      }
    }
  } catch {
    // Fallback below
  }

  return {
    title: "Blog Post",
    description: "Read our latest dental health article.",
  };
}

export default function Page() {
  return <BlogPostPage />;
}
