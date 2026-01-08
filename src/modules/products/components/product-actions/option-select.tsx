"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void }
  }
}

// Color name translations English -> German
const colorTranslations: Record<string, string> = {
  "Army Green": "Armee-Grün",
  "Black": "Schwarz",
  "Cognac": "Cognac",
  "Dark Green": "Dunkelgrün",
  "Mocca": "Mocca",
  "Purple": "Lila",
  "Silver": "Silber",
  "Slate Gray": "Blaugrau",
  "White": "Weiß",
  "Red": "Rot",
  "Blue": "Blau",
  "Green": "Grün",
  "Gold": "Gold",
  "Rose": "Rosa",
  "Rosa": "Rosa",
  "Navy": "Marineblau",
  "Beige": "Beige",
  "Brown": "Braun",
  "Gray": "Grau",
  "Grey": "Grau",
  "Pink": "Pink",
  "Orange": "Orange",
  "Yellow": "Gelb",
  "Gunmetal": "Gunmetal",
  "Champagner": "Champagner",
  "Lila": "Lila",
  "Blaugrau": "Blaugrau",
}

// Hex color codes for visual display
const COLOR_HEX: Record<string, string> = {
  "black": "#1A1A1A",
  "schwarz": "#1A1A1A",
  "gold": "#D4AF37",
  "champagner": "#F7E7CE",
  "silver": "#C0C0C0",
  "silber": "#C0C0C0",
  "rosa": "#D4919D",
  "rose": "#D4919D",
  "pink": "#D4919D",
  "lila": "#8B008B",
  "purple": "#8B008B",
  "blaugrau": "#6B7D8C",
  "slate gray": "#6B7D8C",
  "dark green": "#2D4A3E",
  "dunkelgrün": "#2D4A3E",
  "army green": "#4A5240",
  "armee-grün": "#4A5240",
  "gunmetal": "#3D3D3D",
  "cognac": "#8B4513",
  "mocca": "#5D4037",
  "white": "#FFFFFF",
  "weiß": "#FFFFFF",
  "red": "#DC2626",
  "rot": "#DC2626",
  "blue": "#2563EB",
  "blau": "#2563EB",
  "green": "#16A34A",
  "grün": "#16A34A",
  "beige": "#D4B896",
  "brown": "#8B4513",
  "braun": "#8B4513",
  "gray": "#708090",
  "grey": "#708090",
  "grau": "#708090",
  "navy": "#1E3A5F",
  "marineblau": "#1E3A5F",
  "orange": "#F97316",
  "yellow": "#EAB308",
  "gelb": "#EAB308",
}

const getColorHex = (colorName: string): string => {
  const key = colorName.toLowerCase().trim()
  return COLOR_HEX[key] || "#6B7280"
}

const translateColorName = (name: string): string => {
  return colorTranslations[name] || name
}

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  productId?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  productId,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColorOption = title.toLowerCase() === "color" || title.toLowerCase() === "farbe"

  const handleOptionClick = (value: string) => {
    updateOption(option.id, value)

    // Track variant selection
    try {
      if (typeof window !== "undefined" && typeof window.umami?.track === "function") {
        window.umami.track("variant_selected", {
          productId: productId || "unknown",
          optionType: title,
          value: value,
        })
      }
    } catch {}
  }

  // Visual color tiles for color options
  if (isColorOption) {
    return (
      <div className="flex flex-col gap-y-3">
        <span className="text-sm font-medium">Farbe wählen</span>
        <div
          className="grid grid-cols-4 sm:grid-cols-5 gap-3"
          data-testid={dataTestId}
        >
          {filteredOptions.map((v) => {
            const displayName = translateColorName(v)
            const hexColor = getColorHex(v)
            const isSelected = v === current
            
            return (
              <button
                onClick={() => handleOptionClick(v)}
                key={v}
                className={clx(
                  "flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-200",
                  {
                    "ring-2 ring-[#C9A962] bg-amber-50/50": isSelected,
                    "hover:scale-105 hover:shadow-md": !isSelected && !disabled,
                    "opacity-50 cursor-not-allowed": disabled,
                  }
                )}
                disabled={disabled}
                data-testid="option-button"
              >
                {/* Color Circle */}
                <div 
                  className={clx(
                    "w-12 h-12 rounded-full shadow-md transition-transform",
                    {
                      "ring-2 ring-offset-2 ring-[#C9A962]": isSelected,
                    }
                  )}
                  style={{ 
                    backgroundColor: hexColor,
                    boxShadow: isSelected 
                      ? "0 4px 12px rgba(0,0,0,0.15), inset 0 -2px 6px rgba(0,0,0,0.1)" 
                      : "0 2px 8px rgba(0,0,0,0.1), inset 0 -2px 6px rgba(0,0,0,0.1)"
                  }}
                />
                {/* Color Name */}
                <span 
                  className={clx(
                    "text-xs text-center leading-tight",
                    {
                      "font-semibold text-[#C9A962]": isSelected,
                      "text-gray-600": !isSelected,
                    }
                  )}
                >
                  {displayName}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Default text buttons for non-color options
  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">{title} wählen</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => handleOptionClick(v)}
              key={v}
              className={clx(
                "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1",
                {
                  "border-ui-border-interactive": v === current,
                  "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
