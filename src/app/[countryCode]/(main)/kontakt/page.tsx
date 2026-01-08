import { Metadata } from "next"
import ContactForm from "@modules/contact/contact-form"

export const metadata: Metadata = {
  title: "Kontakt | WELANDA",
  description: "Kontaktiere das WELANDA Team. Wir sind für dich da!",
}

export default function KontaktPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: '#C9A962' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
            Kontakt
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
          </span>
          <h1 
            className="text-3xl font-bold tracking-tight mb-4"
            style={{ color: '#0A0A0A' }}
          >
            Wir sind für dich da
          </h1>
          <p style={{ color: '#6B7280' }}>
            Hast du Fragen zu unseren Produkten oder deiner Bestellung? Schreib uns!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kontaktformular */}
          <ContactForm />

          {/* Kontaktinfos */}
          <div>
            <h2 
              className="text-xl font-semibold mb-6"
              style={{ color: '#1A1A1A' }}
            >
              Kontaktdaten
            </h2>

            <div className="space-y-6">
              {/* E-Mail */}
              <div 
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: '#F8F8F8' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                >
                  <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: '#1A1A1A' }}>E-Mail</h3>
                  <a 
                    href="mailto:contact@welanda.com" 
                    className="hover:underline"
                    style={{ color: '#C9A962' }}
                  >
                    contact@welanda.com
                  </a>
                </div>
              </div>

              {/* Telefon */}
              <div 
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: '#F8F8F8' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                >
                  <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: '#1A1A1A' }}>Telefon</h3>
                  <a 
                    href="tel:+4915122628518" 
                    className="hover:underline"
                    style={{ color: '#C9A962' }}
                  >
                    +49 151 22628518
                  </a>
                  <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
                    Mo-Fr, 9-17 Uhr
                  </p>
                </div>
              </div>

              {/* Adresse */}
              <div 
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: '#F8F8F8' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                >
                  <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: '#1A1A1A' }}>Adresse</h3>
                  <p style={{ color: '#6B7280' }}>
                    WELANDA<br />
                    Querstraße 6<br />
                    90489 Nürnberg<br />
                    Deutschland
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div 
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: '#F8F8F8' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                >
                  <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: '#1A1A1A' }}>Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    <a 
                      href="https://instagram.com/welanda" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: '#C9A962' }}
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://tiktok.com/@welanda" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: '#C9A962' }}
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Hint */}
            <div 
              className="mt-8 p-6 rounded-lg"
              style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                Schnelle Antworten gesucht?
              </h3>
              <p className="text-sm mb-3" style={{ color: '#6B7280' }}>
                Viele Fragen beantworten wir bereits in unserem FAQ-Bereich.
              </p>
              <a 
                href="/faq" 
                className="inline-flex items-center text-sm font-medium"
                style={{ color: '#C9A962' }}
              >
                Zu den FAQ
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
