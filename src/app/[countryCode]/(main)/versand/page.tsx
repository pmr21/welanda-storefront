import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Versand & Lieferung",
  description: "Informationen zu Versandkosten, Lieferzeiten und Versandoptionen bei WELANDA.",
}

export default function VersandPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-3xl font-bold tracking-tight mb-8"
          style={{ color: '#0A0A0A' }}
        >
          Versand & Lieferung
        </h1>

        <div className="prose prose-lg max-w-none" style={{ color: '#4B5563' }}>
          
          {/* Versandkosten Tabelle */}
          <div 
            className="not-prose mb-8 p-6 rounded-lg"
            style={{ backgroundColor: '#F8F8F8' }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#1A1A1A' }}>
              Versandkosten
            </h2>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <th className="text-left py-2" style={{ color: '#1A1A1A' }}>Land</th>
                  <th className="text-right py-2" style={{ color: '#1A1A1A' }}>Kosten</th>
                  <th className="text-right py-2" style={{ color: '#1A1A1A' }}>Kostenlos ab</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3">Deutschland</td>
                  <td className="text-right py-3">4,99 €</td>
                  <td className="text-right py-3" style={{ color: '#C9A962' }}>50 €</td>
                </tr>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3">Österreich</td>
                  <td className="text-right py-3">6,99 €</td>
                  <td className="text-right py-3" style={{ color: '#C9A962' }}>75 €</td>
                </tr>
                <tr className="border-b" style={{ borderColor: '#E5E7EB' }}>
                  <td className="py-3">Schweiz</td>
                  <td className="text-right py-3">9,99 €</td>
                  <td className="text-right py-3" style={{ color: '#C9A962' }}>100 €</td>
                </tr>
                <tr>
                  <td className="py-3">EU (andere)</td>
                  <td className="text-right py-3">9,99 €</td>
                  <td className="text-right py-3" style={{ color: '#C9A962' }}>100 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ color: '#1A1A1A' }}>Lieferzeiten</h2>
          
          <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                Standardprodukte
              </h3>
              <p className="text-2xl font-bold mb-1" style={{ color: '#C9A962' }}>
                2-4 Werktage
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                innerhalb Deutschlands
              </p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                Mit Personalisierung
              </h3>
              <p className="text-2xl font-bold mb-1" style={{ color: '#C9A962' }}>
                4-7 Werktage
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                inkl. Gravur-Anfertigung
              </p>
            </div>
          </div>

          <h2 style={{ color: '#1A1A1A' }}>Versandpartner</h2>
          <p>
            Wir versenden mit DHL und DPD. Nach dem Versand erhältst du eine E-Mail mit der 
            Sendungsverfolgungsnummer, mit der du dein Paket jederzeit tracken kannst.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Lieferadresse</h2>
          <p>
            Wir liefern an die von dir bei der Bestellung angegebene Adresse. Bitte stelle sicher, 
            dass alle Angaben korrekt sind. Änderungen der Lieferadresse sind nach Versand leider 
            nicht mehr möglich.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Packstation & Paketshop</h2>
          <p>
            Du kannst deine Bestellung auch an eine DHL Packstation oder einen Paketshop liefern 
            lassen. Gib dazu einfach die entsprechende Adresse bei der Bestellung an.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Internationale Lieferung</h2>
          <p>
            Wir liefern derzeit in folgende Länder:
          </p>
          <ul>
            <li>Deutschland</li>
            <li>Österreich</li>
            <li>Schweiz</li>
            <li>Niederlande</li>
            <li>Belgien</li>
            <li>Frankreich</li>
            <li>Italien</li>
            <li>Spanien</li>
            <li>Schweden</li>
            <li>Dänemark</li>
          </ul>
          <p>
            Für andere Länder kontaktiere uns bitte unter{' '}
            <a href="mailto:contact@welanda.com" style={{ color: '#C9A962' }}>
              contact@welanda.com
            </a>
            .
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Fragen zum Versand?</h2>
          <p>
            Bei Fragen zu deiner Lieferung erreichst du uns unter:{' '}
            <a href="mailto:contact@welanda.com" style={{ color: '#C9A962' }}>
              contact@welanda.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
