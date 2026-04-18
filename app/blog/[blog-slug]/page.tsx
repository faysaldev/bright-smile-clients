"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import {
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
} from "@/src/redux/features/blog/blogApi";

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.["blog-slug"] as string;

  const { data: post, isLoading, isError } = useGetPostBySlugQuery(slug);
  const { data: allPosts } = useGetAllPostsQuery({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (isError && typeof window !== "undefined") {
      router.replace("/blog");
    }
  }, [isError, router]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
      </div>
    );
  }

  if (!post) return null;

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    if (!text) return null;
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-heading font-bold mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-heading font-semibold mt-8 mb-3">
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-none space-y-2 my-4">
            {items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-muted-foreground leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      if (block.startsWith("1. ")) {
        const items = block.split("\n").filter((l) => /^\d+\./.test(l));
        return (
          <ol key={i} className="space-y-2 my-4">
            {items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {j + 1}
                </span>
                {item.replace(/^\d+\.\s*/, "")}
              </li>
            ))}
          </ol>
        );
      }
      // Handle bold text within paragraphs
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-muted-foreground leading-relaxed my-4">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            ),
          )}
        </p>
      );
    });
  };

  // Related posts
  const related =
    allPosts?.posts?.filter((p: any) => p.slug !== slug).slice(0, 3) || [];

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-narrow max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold mt-4 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author?.name || "Admin"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding pt-0">
          <div className="container-narrow max-w-3xl">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 sm:h-96 rounded-3xl object-cover shadow-2xl mb-10"
              />
            ) : (
              <div className="h-72 sm:h-96 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 mb-10" />
            )}
            <article className="prose-custom">
              {renderContent(post.content)}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                {post.author?.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {post.author?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "BS"}
                  </div>
                )}
                <div>
                  <p className="font-heading font-semibold text-sm">
                    {post.author?.name || "Admin"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.author?.role || "BrightSmile Dental"}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="section-padding bg-secondary/30">
            <div className="container-narrow">
              <h2 className="text-2xl font-heading font-bold mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p: any) => (
                  <Link
                    href={`/blog/${p.slug}`}
                    key={p.slug}
                    className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all"
                  >
                    <div
                      className="h-36 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${p.image || "/blog-placeholder.png"})`,
                      }}
                    />
                    <div className="p-5">
                      <span className="text-xs font-medium text-primary">
                        {p.category}
                      </span>
                      <h3 className="font-heading font-semibold mt-2 mb-1 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(p.publishDate)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
