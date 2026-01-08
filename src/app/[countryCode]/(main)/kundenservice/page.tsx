import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kundenservice | WELANDA",
  description: "Kontaktieren Sie uns bei Fragen zu Ihrer Bestellung oder unseren Produkten.",
}

export default function KundenservicePage() {
  return (
    <div className="content-container py-12">
      <h1 className="text-3xl font-bold mb-8 text-[#1A1A1A]">Kundenservice</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Kontakt */}
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Kontakt</h2>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">✉</span>
              <a href="mailto:info@welanda.com" className="hover:text-[#C9A962]">info@welanda.com</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">📞</span>
              <span>+49 40 123 456 78</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#C9A962]">🕐</span>
              <span>Mo-Fr: 9:00 - 17:00 Uhr</span>
            </p>
          </div>
        </section>
        
        {/* Versand & Lieferung */}
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Versand & Lieferung</h2>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Kostenloser Versand ab 50 €</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Lieferzeit: 2-4 Werktage</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Versand mit DHL</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Personalisierte Produkte: +1-2 Werktage Bearbeitungszeit
            </p>
          </div>
        </section>
        
        {/* Rückgabe & Umtausch */}
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Rückgabe & Umtausch</h2>
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>14 Tage Rückgaberecht</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Kostenlose Retoure</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Hinweis:</strong> Personalisierte Produkte sind vom Umtausch ausgeschlossen, 
              es sei denn, es liegt ein Produktionsfehler vor.
            </p>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Häufige Fragen</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-[#1A1A1A]">Wie lange dauert die Personalisierung?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Die Lasergravur wird in unserer Hamburger Werkstatt angefertigt und dauert 1-2 Werktage.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-[#1A1A1A]">Welche Zahlungsmethoden gibt es?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Wir akzeptieren Kreditkarte, PayPal, Klarna, SOFORT und iDEAL.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-[#1A1A1A]">Kann ich meine Bestellung verfolgen?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Ja, Sie erhalten eine E-Mail mit Tracking-Link sobald Ihre Bestellung versendet wird.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      {/* Adresse */}
      <section className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">Anschrift</h2>
        <address className="not-italic text-gray-600">
          <strong>WELANDA GmbH</strong><br />
          Musterstraße 123<br />
          20095 Hamburg<br />
          Deutschland
        </address>
      </section>
    </div>
  )
}
