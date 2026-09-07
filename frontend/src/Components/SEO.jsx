import { Helmet } from "react-helmet-async";

const SITE_URL = "https://wahrehousing-project.vercel.app/";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
const SITE_NAME = "Vardha Warehousing";

export default function SEO({
  title = "",
  description = "",
  keywords = "",
  canonicalUrl = "",
  ogTitle = "",
  ogDescription = "",
  ogImage = "",
  ogType = "website",
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullCanonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;
  const resolvedOgTitle = ogTitle || title || SITE_NAME;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      {resolvedOgDescription && (
        <meta property="og:description" content={resolvedOgDescription} />
      )}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      {resolvedOgDescription && (
        <meta name="twitter:description" content={resolvedOgDescription} />
      )}
      <meta name="twitter:image" content={resolvedOgImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
