"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Search, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useGetAllPostsQuery } from "@/src/redux/features/blog/blogApi";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const Blog = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: blogPosts, isLoading } = useGetAllPostsQuery({
    category: filter === "All" ? undefined : filter,
    searchTerm: search || undefined,
  });
  const categories = [
    "All",
    "Oral Health",
    "Procedures",
    "Cosmetic",
    "Pediatric",
    "Patient Care",
  ];

  const posts = blogPosts?.posts || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!gridRef.current || isLoading) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".blog-card"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [isLoading, blogPosts, posts]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="pb-16 pt-8">
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-narrow text-center animate-pulse">
            <div className="h-6 w-20 bg-muted mx-auto rounded mb-4" />
            <div className="h-12 w-64 bg-muted mx-auto rounded" />
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="pb-16 pt-8">
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-narrow text-center">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Blog
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold mt-2 mb-4">
              Dental Health Insights
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Expert tips and guides to keep your smile healthy and bright.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {posts.length > 0 && filter === "All" && !search && (
              <Link
                href={`/blog/${posts[0].slug}`}
                className="block mb-10 glass-card rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div
                    className="h-64 lg:h-auto bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${posts[0].image || "/blog-placeholder.png"})`,
                    }}
                  />
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">
                      {posts[0].category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {posts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(posts[0].publishDate)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {posts[0].readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((p: any) => (
                <Link
                  href={`/blog/${p.slug}`}
                  key={p.slug}
                  className="blog-card glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] hover:shadow-xl transition-all"
                >
                  <div
                    className="h-44 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${p.image || "/blog-placeholder.png"})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {p.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {p.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {p.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(p.publishDate)}
                      </p>
                      <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
