"use client";

import Head from "next/head";
import {
  generateProjectStructuredData,
  generateFAQStructuredData,
} from "../lib/seo-utils";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title = "Shakti Singh Chundawat | Full Stack Developer",
  description = "Professional portfolio showcasing my experience, projects, and skills in web development.",
  canonical,
  noindex = false,
}: SEOHeadProps) {
  const projectStructuredData = generateProjectStructuredData();
  const faqStructuredData = generateFAQStructuredData();

  return (
    <Head>
      {/* SEO Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <meta name="theme-color" content="#3b82f6" />

      {/* Preconnect & Prefetch */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />

      {/* Viewport */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
    </Head>
  );
}
