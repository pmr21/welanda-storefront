import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Rückgabe & Umtausch | WELANDA",
  description: "Informationen zu Rückgabe, Umtausch und Reklamationen bei WELANDA.",
}

export default function RueckgabePage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: '#C9A962' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
            Service
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
          </span>
          <h1 
            className="text-3xl font-bold tracking-tight mb-4"
            style={{ color: '#0A0A0A' }}
          >
            Rückgabe & Umtausch
          </h1>
          <p style={{ color: '#6B7280' }}>
            Deine Zufriedenheit liegt uns am Herzen. Hier findest du alle Informationen zur Rückgabe.
          </p>
        </div>

        {/* Wichtiger Hinweis */}
        <div 
          className="mb-10 p-6 rounded-lg border-l-4"
          style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', borderColor: '#C9A962' }}
        >
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1A1A1A' }}>
                Wichtiger Hinweis zu personalisierten Produkten
              </h3>
              <p style={{ color: '#4B5563' }}>
                <strong>Personalisierte Produkte (mit Gravur) sind grundsätzlich vom Umtausch und der Rückgabe ausgeschlossen.</strong> Da diese Artikel nach deinen individuellen Wünschen angefertigt werden, können wir sie nicht zurücknehmen (§ 312g Abs. 2 Nr. 1 BGB).
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none" style={{ color: '#4B5563' }}>
          
          <h2 style={{ color: '#1A1A1A' }}>14 Tage Rückgaberecht</h2>
          <p>
            Du kannst <strong>nicht personalisierte Standardprodukte</strong> innerhalb von 14 Tagen nach Erhalt ohne Angabe von Gründen an uns zurücksenden. Die Frist beginnt mit dem Tag, an dem du oder ein von dir benannter Dritter die Ware erhalten hat.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>So funktioniert die Rückgabe</h2>
          
          <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#F8F8F8' }}>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
              >
                <span className="text-xl font-bold" style={{ color: '#C9A962' }}>1</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>Kontaktiere uns</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Schreib uns an contact@welanda.com mit deiner Bestellnummer
              </p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#F8F8F8' }}>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
              >
                <span className="text-xl font-bold" style={{ color: '#C9A962' }}>2</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>Paket versenden</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Sende die Ware originalverpackt an unsere Adresse zurück
              </p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#F8F8F8' }}>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
              >
                <span className="text-xl font-bold" style={{ color: '#C9A962' }}>3</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>Erstattung</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Nach Prüfung erstatten wir den Kaufpreis innerhalb von 14 Tagen
              </p>
            </div>
          </div>

          <h2 style={{ color: '#1A1A1A' }}>Voraussetzungen für die Rückgabe</h2>
          <ul>
            <li>Die Ware muss unbenutzt und in einwandfreiem Zustand sein</li>
            <li>Originalverpackung sollte vorhanden sein</li>
            <li>Die Rücksendung muss innerhalb von 14 Tagen nach Widerruf erfolgen</li>
            <li>Es handelt sich um ein nicht personalisiertes Produkt</li>
          </ul>

          <h2 style={{ color: '#1A1A1A' }}>Rücksendeadresse</h2>
          <div 
            className="not-prose p-4 rounded-lg my-4"
            style={{ backgroundColor: '#F8F8F8' }}
          >
            <p style={{ color: '#4B5563' }}>
              WELANDA - Retoure<br />
              Piyal Ranasinghe<br />
              Querstraße 6<br />
              90489 Nürnberg<br />
              Deutschland
            </p>
          </div>

          <h2 style={{ color: '#1A1A1A' }}>Rücksendekosten</h2>
          <p>
            Bei Widerruf trägst du die unmittelbaren Kosten der Rücksendung. 
            Wir empfehlen einen versicherten Versand, da wir für Verlust oder Beschädigung 
            auf dem Rücksendeweg nicht haften können.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Erstattung</h2>
          <p>
            Nach Erhalt und Prüfung der Rücksendung erstatten wir dir den Kaufpreis 
            inklusive der ursprünglichen Versandkosten (Standardversand) innerhalb von 14 Tagen. 
            Die Erstattung erfolgt über dasselbe Zahlungsmittel, das du bei der Bestellung 
            verwendet hast.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Umtausch</h2>
          <p>
            Möchtest du ein Produkt gegen eine andere Variante (z.B. andere Farbe) umtauschen? 
            Kein Problem! Sende uns einfach eine E-Mail an{' '}
            <a href="mailto:contact@welanda.com" style={{ color: '#C9A962' }}>
              contact@welanda.com
            </a>{' '}
            und wir besprechen die Details.
          </p>
          <p>
            <strong>Bitte beachte:</strong> Ein Umtausch ist nur bei nicht personalisierten 
            Standardprodukten möglich.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Reklamation / Defekte Ware</h2>
          <p>
            Sollte dein Produkt beschädigt ankommen oder einen Defekt aufweisen, kontaktiere 
            uns bitte umgehend unter{' '}
            <a href="mailto:contact@welanda.com" style={{ color: '#C9A962' }}>
              contact@welanda.com
            </a>{' '}
            mit:
          </p>
          <ul>
            <li>Deiner Bestellnummer</li>
            <li>Fotos des Schadens/Defekts</li>
            <li>Kurzer Beschreibung des Problems</li>
          </ul>
          <p>
            Bei berechtigten Reklamationen übernehmen wir selbstverständlich die Rücksendekosten 
            und senden dir kostenfrei Ersatz zu.
          </p>

          {/* Zusammenfassung */}
          <div 
            className="not-prose mt-10 p-6 rounded-lg"
            style={{ backgroundColor: '#F8F8F8' }}
          >
            <h3 className="font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              Auf einen Blick
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3 font-medium" style={{ color: '#1A1A1A' }}>Standardprodukte</td>
                  <td className="py-3" style={{ color: '#6B7280' }}>14 Tage Rückgaberecht ✓</td>
                </tr>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3 font-medium" style={{ color: '#1A1A1A' }}>Personalisierte Produkte</td>
                  <td className="py-3" style={{ color: '#C9A962' }}>Vom Umtausch ausgeschlossen</td>
                </tr>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3 font-medium" style={{ color: '#1A1A1A' }}>Rücksendekosten</td>
                  <td className="py-3" style={{ color: '#6B7280' }}>Trägt der Käufer</td>
                </tr>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3 font-medium" style={{ color: '#1A1A1A' }}>Reklamationen</td>
                  <td className="py-3" style={{ color: '#6B7280' }}>Kostenlose Rücksendung ✓</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium" style={{ color: '#1A1A1A' }}>Erstattungsdauer</td>
                  <td className="py-3" style={{ color: '#6B7280' }}>Innerhalb von 14 Tagen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Kontakt CTA */}
        <div className="mt-12 text-center">
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: '#1A1A1A' }}
          >
            Noch Fragen?
          </h3>
          <p className="mb-4" style={{ color: '#6B7280' }}>
            Unser Support-Team hilft dir gerne weiter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@welanda.com"
              className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md transition-colors"
              style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@welanda.com
            </a>
            <Link 
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-md transition-colors border"
              style={{ borderColor: '#E5E7EB', color: '#1A1A1A' }}
            >
              Zu den FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
