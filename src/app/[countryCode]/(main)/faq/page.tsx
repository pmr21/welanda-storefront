import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Häufige Fragen",
  description: "Antworten auf häufig gestellte Fragen zu WELANDA Snus Dosen, Personalisierung, Versand und mehr.",
}

const faqs = [
  {
    category: "Produkte",
    questions: [
      {
        q: "Aus welchem Material sind die Snus Dosen?",
        a: "Alle WELANDA Snus Dosen werden aus hochwertigem, CNC-gefrästem Aluminium gefertigt. Das Material ist extrem langlebig, leicht und rostfrei."
      },
      {
        q: "Sind die Dosen wasserdicht?",
        a: "Ja, alle unsere Dosen verfügen über eine Silikon-Dichtung, die sie wasserdicht macht. So bleibt dein Snus immer frisch."
      },
      {
        q: "Welche Dose ist die richtige für mich?",
        a: "Die Puck S (55mm) ist perfekt für unterwegs, die Classic (65mm) ist unser Allrounder mit 2 Kammern, und die Large (70mm) bietet maximale Kapazität. Schau dir unseren Blog-Guide für eine detaillierte Beratung an."
      },
    ]
  },
  {
    category: "Personalisierung",
    questions: [
      {
        q: "Was kann ich gravieren lassen?",
        a: "Du kannst Texte (Namen, Initialen, Sprüche) und Grafiken (Logos, Symbole) gravieren lassen. Die Gravur erfolgt per Laser und ist permanent."
      },
      {
        q: "Wie viel kostet die Personalisierung?",
        a: "Die Personalisierung kostet 9,99 € pro Seite. Du kannst Deckel und/oder Unterseite gravieren lassen."
      },
      {
        q: "Kann ich mein eigenes Logo hochladen?",
        a: "Ja! Du kannst PNG- oder SVG-Dateien hochladen. Für beste Ergebnisse empfehlen wir Vektorgrafiken (SVG) oder hochauflösende PNGs."
      },
      {
        q: "Wie lange dauert die Anfertigung personalisierter Produkte?",
        a: "Personalisierte Produkte benötigen 2-3 zusätzliche Werktage für die Gravur, bevor sie versendet werden."
      },
    ]
  },
  {
    category: "Bestellung & Versand",
    questions: [
      {
        q: "Wie lange dauert der Versand?",
        a: "Standardprodukte werden innerhalb von 2-4 Werktagen geliefert. Personalisierte Produkte benötigen 4-7 Werktage."
      },
      {
        q: "Wie hoch sind die Versandkosten?",
        a: "Innerhalb Deutschlands: 4,99 € (kostenlos ab 50 €). Österreich: 6,99 € (kostenlos ab 75 €). Schweiz & EU: 9,99 € (kostenlos ab 100 €)."
      },
      {
        q: "Kann ich meine Bestellung tracken?",
        a: "Ja, nach dem Versand erhältst du eine E-Mail mit der Sendungsverfolgungsnummer."
      },
      {
        q: "In welche Länder liefert ihr?",
        a: "Wir liefern nach Deutschland, Österreich, Schweiz und in die meisten EU-Länder. Für andere Länder kontaktiere uns bitte."
      },
    ]
  },
  {
    category: "Rückgabe & Umtausch",
    questions: [
      {
        q: "Kann ich meine Bestellung zurückgeben?",
        a: "Standardprodukte kannst du innerhalb von 14 Tagen ohne Angabe von Gründen zurückgeben. Personalisierte Produkte sind vom Widerrufsrecht ausgeschlossen."
      },
      {
        q: "Was, wenn mein Produkt beschädigt ankommt?",
        a: "Kontaktiere uns bitte sofort unter contact@welanda.com mit Fotos des Schadens. Wir finden eine Lösung!"
      },
      {
        q: "Wer trägt die Rücksendekosten?",
        a: "Bei Widerruf trägt der Käufer die Rücksendekosten. Bei Reklamationen (defekte/falsche Ware) übernehmen wir die Kosten."
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: '#C9A962' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
            Support
            <span className="w-8 h-px" style={{ backgroundColor: '#C9A962' }}></span>
          </span>
          <h1 
            className="text-3xl font-bold tracking-tight mb-4"
            style={{ color: '#0A0A0A' }}
          >
            Häufig gestellte Fragen
          </h1>
          <p style={{ color: '#6B7280' }}>
            Hier findest du Antworten auf die wichtigsten Fragen.
          </p>
        </div>

        {faqs.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 
              className="text-xl font-semibold mb-6 pb-2 border-b"
              style={{ color: '#1A1A1A', borderColor: '#E5E7EB' }}
            >
              {section.category}
            </h2>
            <div className="space-y-6">
              {section.questions.map((faq, index) => (
                <div key={index}>
                  <h3 
                    className="font-medium mb-2"
                    style={{ color: '#1A1A1A' }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ color: '#6B7280' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div 
          className="mt-12 p-8 rounded-lg text-center"
          style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
        >
          <h2 
            className="text-xl font-semibold mb-2"
            style={{ color: '#1A1A1A' }}
          >
            Frage nicht dabei?
          </h2>
          <p className="mb-4" style={{ color: '#6B7280' }}>
            Kontaktiere uns – wir helfen dir gerne weiter!
          </p>
          <a 
            href="/kontakt"
            className="inline-flex items-center px-6 py-3 font-medium rounded-md transition-colors"
            style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  )
}
