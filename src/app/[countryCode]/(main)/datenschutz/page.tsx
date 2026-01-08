import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | WELANDA",
  description: "Datenschutzerklärung und Informationen zum Umgang mit Ihren Daten bei WELANDA.",
}

export default function DatenschutzPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-3xl font-bold tracking-tight mb-8"
          style={{ color: '#0A0A0A' }}
        >
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none" style={{ color: '#4B5563' }}>
          <h2 style={{ color: '#1A1A1A' }}>1. Datenschutz auf einen Blick</h2>
          
          <h3 style={{ color: '#1A1A1A' }}>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br /><br />
            WELANDA - Piyal Ranasinghe<br />
            Querstraße 6<br />
            90489 Nürnberg<br />
            E-Mail: contact@welanda.com
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann 
            es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer 
            Bestellung angeben.
          </p>
          <p>
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
            durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
            Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Wofür nutzen wir Ihre Daten?</h3>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
            gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            Bei Bestellungen werden Ihre Daten zur Vertragsabwicklung und zum Versand verwendet.
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
            Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, 
            die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur 
            Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft 
            widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung 
            der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei Netcup GmbH, Daimlerstraße 25, 76185 Karlsruhe.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3 style={{ color: '#1A1A1A' }}>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            WELANDA - Piyal Ranasinghe<br />
            Querstraße 6<br />
            90489 Nürnberg<br />
            Telefon: +49 151 22628518<br />
            E-Mail: contact@welanda.com
          </p>

          <h2 style={{ color: '#1A1A1A' }}>4. Datenerfassung auf dieser Website</h2>
          
          <h3 style={{ color: '#1A1A1A' }}>Cookies</h3>
          <p>
            Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete 
            und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für 
            die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem 
            Endgerät gespeichert.
          </p>
          <p>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert 
            werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte 
            Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim 
            Schließen des Browsers aktivieren.
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
            Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>

          <h2 style={{ color: '#1A1A1A' }}>5. eCommerce und Zahlungsanbieter</h2>
          
          <h3 style={{ color: '#1A1A1A' }}>Verarbeiten von Kunden- und Vertragsdaten</h3>
          <p>
            Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und Vertragsdaten zur 
            Begründung, inhaltlichen Ausgestaltung und Änderung unserer Vertragsbeziehungen. 
            Personenbezogene Daten über die Inanspruchnahme dieser Website (Nutzungsdaten) erheben, 
            verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die 
            Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen.
          </p>

          <h3 style={{ color: '#1A1A1A' }}>Datenübermittlung bei Vertragsschluss</h3>
          <p>
            Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der 
            Vertragsabwicklung notwendig ist, etwa an das mit der Lieferung beauftragte 
            Versandunternehmen oder das mit der Zahlungsabwicklung beauftragte Kreditinstitut.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>6. Ihre Rechte</h2>
          <p>
            Sie haben folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
          </p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          </ul>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die 
            Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
          </p>
        </div>
      </div>
    </div>
  )
}
