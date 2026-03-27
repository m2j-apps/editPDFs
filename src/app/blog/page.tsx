import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import { posts } from "./posts-registry";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 mb-8">
          Tips, guides, and tutorials for working with PDFs
        </p>

        <AdUnit slot="TOP_BANNER" format="horizontal" className="mb-8" />

        <div className="space-y-8">
          {posts.map((post, index) => (
            <div key={post.slug}>
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">&bull;</span>
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">&bull;</span>
                  <span>{post.readTime}</span>
                </div>
              </article>

              {(index + 1) % 5 === 0 && index < posts.length - 1 && (
                <div className="mt-8">
                  <AdUnit slot="MIDDLE_BANNER" format="horizontal" />
                </div>
              )}
            </div>
          ))}
        </div>

        <AdUnit slot="BOTTOM_BANNER" format="horizontal" className="mt-8" />
      </div>
    </div>
  );
}
