export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WELANDA",
    "url": "https://welanda.com",
    "logo": "https://welanda.com/logo.png",
    "description": "Hochwertige personalisierbare Snus Dosen & EDC Accessoires. Lasergravur made in Hamburg.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@welanda.com"
    },
    "sameAs": []
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
