import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const COLOR_MAP: Record<string, string> = {
  black: "#1A1A1A",
  schwarz: "#1A1A1A",
  silver: "#C0C0C0",
  silber: "#C0C0C0",
  gold: "#C9A962",
  rosa: "#F5A3B5",
  pink: "#F5A3B5",
  "army green": "#4B5320",
  "dark green": "#1D3D1D",
  green: "#4B5320",
  "slate gray": "#708090",
  gray: "#708090",
  cognac: "#9A5B3C",
  mocca: "#5C4033",
  purple: "#7B5EA7",
  gunmetal: "#2A3439",
  champagner: "#F7E7CE",
}

// Deutsche Übersetzungen für Option-Titel
const TITLE_TRANSLATIONS: Record<string, string> = {
  "color": "Farbe",
  "farbe": "Farbe",
  "size": "Größe",
  "größe": "Größe",
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const isColorOption = title.toLowerCase() === "farbe" || title.toLowerCase() === "color"
  const displayTitle = TITLE_TRANSLATIONS[title.toLowerCase()] || title

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
        {displayTitle}{current && `: `}
        {current && <span style={{ color: '#6B7280' }}>{current}</span>}
      </span>
      
      <div className="flex flex-wrap gap-3" data-testid={dataTestId}>
        {option.values?.map((v) => {
          const isSelected = v.value === current
          const colorHex = COLOR_MAP[v.value.toLowerCase()] || "#E5E7EB"

          if (isColorOption) {
            return (
              <button
                key={v.id}
                onClick={() => updateOption(option.id, v.value)}
                disabled={disabled}
                className={clx(
                  "w-10 h-10 rounded-full transition-all duration-200 relative",
                  "hover:scale-110 focus:outline-none",
                  isSelected && "ring-2 ring-offset-2 ring-[#C9A962]",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{ backgroundColor: colorHex }}
                title={v.value}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke={["#1A1A1A", "#2A3439", "#5C4033", "#1D3D1D", "#4B5320"].includes(colorHex) ? "#FFFFFF" : "#1A1A1A"} 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            )
          }

          return (
            <button
              key={v.id}
              onClick={() => updateOption(option.id, v.value)}
              disabled={disabled}
              className={clx(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 border focus:outline-none",
                isSelected && "border-[#C9A962] bg-[#C9A962]/10 text-[#1A1A1A]",
                !isSelected && "border-gray-300 text-[#4B5563] hover:border-[#C9A962]",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {v.value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
