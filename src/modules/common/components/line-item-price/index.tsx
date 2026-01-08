import { getPercentageDiff } from "@lib/util/get-percentage-diff"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

// Helper to get personalization price from metadata
const getPersonalizationPrice = (metadata: Record<string, any> | null | undefined): number => {
  if (!metadata?.personalization) return 0
  try {
    const personalization = typeof metadata.personalization === "string"
      ? JSON.parse(metadata.personalization)
      : metadata.personalization
    return personalization?.totalPrice || 0
  } catch {
    return 0
  }
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemPriceProps) => {
  const { total, original_total, quantity } = item
  const personalizationPrice = getPersonalizationPrice(item.metadata) * (quantity || 1)
  
  const originalPrice = (original_total ?? 0) + personalizationPrice
  const currentPrice = (total ?? 0) + personalizationPrice
  const hasReducedPrice = (total ?? 0) < (original_total ?? 0)

  return (
    <div className="flex flex-col gap-x-2 text-ui-fg-subtle items-end">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === "default" && (
                <span className="text-ui-fg-subtle">Original: </span>
              )}
              <span
                className="line-through text-ui-fg-muted"
                data-testid="product-original-price"
              >
                {convertToLocale({
                  amount: originalPrice,
                  currency_code: currencyCode,
                })}
              </span>
            </p>
            {style === "default" && (
              <span className="text-ui-fg-interactive">
                -{getPercentageDiff(original_total ?? 0, total ?? 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clx("text-base-regular", {
            "text-ui-fg-interactive": hasReducedPrice,
          })}
          data-testid="product-price"
        >
          {convertToLocale({
            amount: currentPrice,
            currency_code: currencyCode,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
