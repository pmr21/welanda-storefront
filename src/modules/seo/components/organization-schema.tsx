export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WELANDA",
    "url": "https://welanda.com",
    "logo": "https://welanda.com/images/logo.png",
    "description": "Hochwertige personalisierbare Snus Dosen & EDC Accessoires aus CNC-gefraestem Aluminium. Lasergravur made in Hamburg.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hamburg",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@welanda.com",
      "availableLanguage": ["German", "English"]
    },
    "sameAs": [
      "https://instagram.com/welanda",
      "https://tiktok.com/@welanda"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
