/**
 * Structured Data (JSON-LD) Component
 * Helps search engines understand your business and content
 */

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "DesignAgency",
    "name": "theoria",
    "url": "https://theoria.co",
    "logo": "https://theoria.co/logo.svg",
    "description": "World-class UX design studio based in Sarajevo. We turn complex products into simple, intuitive interfaces.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sarajevo",
      "addressCountry": "BA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.82758518200419,
      "longitude": 18.348526800717455
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@theoria.co",
      "contactType": "Customer Service"
    },
    "sameAs": [
      // Add your social media profiles here when ready
      // "https://twitter.com/theoria",
      // "https://linkedin.com/company/theoria"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "theoria",
    "url": "https://theoria.co",
    "description": "World-class UX design studio based in Sarajevo",
    "publisher": {
      "@type": "Organization",
      "name": "theoria"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
