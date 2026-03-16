export default function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: "EditPDFs Team",
      url: "https://editpdfs.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "EditPDFs.app",
      url: "https://editpdfs.app",
      logo: {
        "@type": "ImageObject",
        url: "https://editpdfs.app/icon.png",
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://editpdfs.app/blog/${slug}`,
    },
    url: `https://editpdfs.app/blog/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
