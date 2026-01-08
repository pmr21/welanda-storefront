import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  metadata?: Record<string, any>
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

type PersonalizationData = {
  lid?: {
    text?: { value: string; size?: number; font?: string }
    logo?: { preview: string; size?: number }
  }
  bottom?: {
    text?: { value: string; size?: number; font?: string }
    logo?: { preview: string; size?: number }
  }
  totalPrice?: number
}

const FONT_NAMES: Record<string, string> = {
  roboto: 'Modern',
  playfair: 'Elegant',
  oswald: 'Bold',
  pacifico: 'Handschrift',
  bebas: 'Block',
  courier: 'Monospace',
}

// Farbuebersetzungen Englisch -> Deutsch
const COLOR_TRANSLATIONS: Record<string, string> = {
  'black': 'Schwarz',
  'white': 'Weiss',
  'silver': 'Silber',
  'gold': 'Gold',
  'cognac': 'Cognac',
  'pink': 'Pink',
  'purple': 'Lila',
  'grey': 'Grau',
  'gray': 'Grau',
  'green': 'Gruen',
  'dark green': 'Dunkelgruen',
  'darkgreen': 'Dunkelgruen',
  'champagne': 'Champagne',
  'lavender': 'Lavendel',
  'red': 'Rot',
  'blue': 'Blau',
  'brown': 'Braun',
}

// Uebersetzt Varianten-Titel (z.B. "Black / M" -> "Schwarz / M")
const translateVariantTitle = (title: string | undefined): string => {
  if (!title) return ''
  
  let translated = title
  
  // Durchsuche alle Farbuebersetzungen (case-insensitive)
  for (const [english, german] of Object.entries(COLOR_TRANSLATIONS)) {
    const regex = new RegExp(`\\b${english}\\b`, 'gi')
    translated = translated.replace(regex, german)
  }
  
  return translated
}

const LineItemOptions = ({
  variant,
  metadata,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  // Parse personalization from metadata
  let personalization: PersonalizationData | null = null
  
  if (metadata?.personalization) {
    try {
      personalization = typeof metadata.personalization === 'string' 
        ? JSON.parse(metadata.personalization) 
        : metadata.personalization
    } catch (e) {
      console.error('Error parsing personalization:', e)
    }
  }

  const hasPersonalization = personalization && (
    personalization.lid?.text?.value || 
    personalization.lid?.logo?.preview ||
    personalization.bottom?.text?.value ||
    personalization.bottom?.logo?.preview
  )

  // Uebersetze Varianten-Titel
  const translatedVariantTitle = translateVariantTitle(variant?.title)

  return (
    <div
      data-testid={dataTestid}
      data-value={dataValue}
      className="txt-medium text-ui-fg-subtle"
    >
      <Text className="text-ui-fg-subtle">
        Variante: {translatedVariantTitle}
      </Text>
      
      {hasPersonalization && (
        <div className="mt-1 pt-1 border-t border-gray-100">
          <Text className="text-xs font-medium text-[#C9A962]">
            Personalisiert:
          </Text>
          
          {/* Deckel */}
          {(personalization?.lid?.text?.value || personalization?.lid?.logo?.preview) && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Deckel:</span>{' '}
              {personalization.lid?.text?.value && (
                <span>
                  {personalization.lid.text.value}
                  {personalization.lid.text.font && personalization.lid.text.font !== 'roboto' && (
                    <span className="text-gray-400 ml-1">
                      ({FONT_NAMES[personalization.lid.text.font] || personalization.lid.text.font})
                    </span>
                  )}
                </span>
              )}
              {personalization.lid?.logo?.preview && (
                <span className="inline-flex items-center gap-1">
                  <img 
                    src={personalization.lid.logo.preview} 
                    alt="Logo" 
                    className="w-4 h-4 object-contain inline-block"
                  />
                  <span>Logo</span>
                </span>
              )}
            </div>
          )}
          
          {/* Boden */}
          {(personalization?.bottom?.text?.value || personalization?.bottom?.logo?.preview) && (
            <div className="text-xs text-gray-600">
              <span className="font-medium">Boden:</span>{' '}
              {personalization.bottom?.text?.value && (
                <span>
                  {personalization.bottom.text.value}
                  {personalization.bottom.text.font && personalization.bottom.text.font !== 'roboto' && (
                    <span className="text-gray-400 ml-1">
                      ({FONT_NAMES[personalization.bottom.text.font] || personalization.bottom.text.font})
                    </span>
                  )}
                </span>
              )}
              {personalization.bottom?.logo?.preview && (
                <span className="inline-flex items-center gap-1">
                  <img 
                    src={personalization.bottom.logo.preview} 
                    alt="Logo" 
                    className="w-4 h-4 object-contain inline-block"
                  />
                  <span>Logo</span>
                </span>
              )}
            </div>
          )}
          
          {/* Personalisierungspreis */}
          {personalization?.totalPrice && personalization.totalPrice > 0 && (
            <div className="text-xs text-[#C9A962] font-medium mt-1">
              + {personalization.totalPrice.toFixed(2)} EUR Gravur
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LineItemOptions
