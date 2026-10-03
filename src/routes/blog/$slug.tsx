import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tilt } from "@/components/Tilt";
import { POSTS, getPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — GST Group Blog` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { property: "og:image", content: loaderData.img },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.img },
        ]
      : [],
  }),
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative pt-36 pb-14 overflow-hidden">
        <img src={post.img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background" />
        <div className="relative mx-auto max-w-3xl px-6 space-y-5 animate-rise">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/60 hover:text-white transition">
            <ArrowLeft className="w-3.5 h-3.5" /> All blogs
          </Link>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-metallic leading-[1.08]">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 text-xs text-foreground/60">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <Tilt max={4} className="glass-strong rounded-3xl overflow-hidden mb-10">
            <img src={post.img} alt={post.title} className="w-full h-[260px] sm:h-[400px] object-cover" />
          </Tilt>
          <article className="mx-auto max-w-3xl space-y-6">
            {post.body.map((para: string, i: number) => (
              <p key={i} className="text-foreground/75 leading-[1.9]">{para}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl text-white mb-6">More insights</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Tilt key={p.slug} className="glass rounded-2xl overflow-hidden h-full">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block h-full group">
                  <div className="relative h-36 overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-display text-white text-base leading-snug">{p.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-primary">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
