import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum | WELANDA",
  description: "Impressum und rechtliche Informationen zu WELANDA.",
}

export default function ImpressumPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-3xl font-bold tracking-tight mb-8"
          style={{ color: '#0A0A0A' }}
        >
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none" style={{ color: '#4B5563' }}>
          <h2 style={{ color: '#1A1A1A' }}>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>WELANDA</strong><br />
            Inhaber: Piyal Ranasinghe<br />
            Querstraße 6<br />
            90489 Nürnberg<br />
            Deutschland
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Kontakt</h2>
          <p>
            Geschäftsführung: Piyal Ranasinghe<br />
            Telefon: +49 151 22628518<br />
            E-Mail: contact@welanda.com
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Piyal Michael Ranasinghe<br />
            Querstraße 6<br />
            90489 Nürnberg
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#C9A962' }}
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
            Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
            erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend 
            entfernen.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
            Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
            mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung 
            nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen 
            werden wir derartige Links umgehend entfernen.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
            Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
            nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. 
            Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte 
            umgehend entfernen.
          </p>
        </div>
      </div>
    </div>
  )
}
