import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description: "Widerrufsbelehrung und Widerrufsformular für WELANDA.",
}

export default function WiderrufPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 
          className="text-3xl font-bold tracking-tight mb-8"
          style={{ color: '#0A0A0A' }}
        >
          Widerrufsbelehrung
        </h1>

        <div className="prose prose-lg max-w-none" style={{ color: '#4B5563' }}>
          <h2 style={{ color: '#1A1A1A' }}>Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu 
            widerrufen.
          </p>
          <p>
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen 
            benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben 
            bzw. hat.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
          </p>
          <p>
            <strong>WELANDA</strong><br />
            Piyal Ranasinghe<br />
            Querstraße 6<br />
            90489 Nürnberg<br />
            E-Mail: contact@welanda.com<br />
            Telefon: +49 151 22628518
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) 
            über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das 
            beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung 
            des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>

          <h2 style={{ color: '#1A1A1A' }}>Folgen des Widerrufs</h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen 
            erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, 
            die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, 
            günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn 
            Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags 
            bei uns eingegangen ist.
          </p>
          <p>
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen 
            Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes 
            vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p>
            Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder 
            bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, 
            welches der frühere Zeitpunkt ist.
          </p>
          <p>
            Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem 
            Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden 
            oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von 
            vierzehn Tagen absenden.
          </p>
          <p>
            Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
          </p>
          <p>
            Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust 
            auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht 
            notwendigen Umgang mit ihnen zurückzuführen ist.
          </p>

          <div 
            className="mt-8 p-6 rounded-lg"
            style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
          >
            <h2 style={{ color: '#1A1A1A' }}>Ausschluss des Widerrufsrechts</h2>
            <p>
              Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht 
              vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung 
              durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse 
              des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB).
            </p>
            <p className="mb-0">
              <strong>Dies gilt insbesondere für alle personalisierten Produkte mit Gravur.</strong>
            </p>
          </div>

          <h2 style={{ color: '#1A1A1A' }} className="mt-8">Muster-Widerrufsformular</h2>
          <p>
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und 
            senden Sie es zurück.)
          </p>
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: '#F8F8F8' }}
          >
            <p>
              An:<br />
              WELANDA - Piyal Ranasinghe<br />
              Querstraße 6<br />
              90489 Nürnberg<br />
              E-Mail: contact@welanda.com
            </p>
            <p>
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den 
              Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
            </p>
            <p>
              Bestellt am (*)/erhalten am (*): _________________
            </p>
            <p>
              Name des/der Verbraucher(s): _________________
            </p>
            <p>
              Anschrift des/der Verbraucher(s): _________________
            </p>
            <p>
              Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): _________________
            </p>
            <p>
              Datum: _________________
            </p>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>
              (*) Unzutreffendes streichen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
