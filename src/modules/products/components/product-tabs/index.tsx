"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    { id: "details", label: "Details" },
    { id: "shipping", label: "Versand" },
    { id: "care", label: "Pflege" },
  ]

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-[#C9A962] text-[#1A1A1A]"
                : "border-transparent text-[#6B7280] hover:text-[#1A1A1A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === "details" && (
          <div className="space-y-4 text-sm" style={{ color: '#4B5563' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium" style={{ color: '#1A1A1A' }}>Material</span>
                <p>CNC-gefrästes Aluminium</p>
              </div>
              <div>
                <span className="font-medium" style={{ color: '#1A1A1A' }}>Oberfläche</span>
                <p>Eloxiert / Anodisiert</p>
              </div>
              <div>
                <span className="font-medium" style={{ color: '#1A1A1A' }}>Wasserdicht</span>
                <p>Ja (Silikon-Dichtung)</p>
              </div>
              <div>
                <span className="font-medium" style={{ color: '#1A1A1A' }}>Herstellung</span>
                <p>Personalisiert in Hamburg</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-3 text-sm" style={{ color: '#4B5563' }}>
            <p><strong style={{ color: '#1A1A1A' }}>Lieferzeit:</strong> 2-4 Werktage (Deutschland)</p>
            <p><strong style={{ color: '#1A1A1A' }}>Versandkosten:</strong> 4,99€ (kostenlos ab 50€)</p>
            <p><strong style={{ color: '#1A1A1A' }}>Personalisierte Produkte:</strong> +2-3 Werktage</p>
            <p><strong style={{ color: '#1A1A1A' }}>Versand nach:</strong> DE, AT, CH, EU</p>
          </div>
        )}

        {activeTab === "care" && (
          <div className="space-y-3 text-sm" style={{ color: '#4B5563' }}>
            <p>• Mit einem weichen, trockenen Tuch reinigen</p>
            <p>• Bei Bedarf mit milder Seifenlauge säubern</p>
            <p>• Nicht in der Spülmaschine reinigen</p>
            <p>• Silikon-Dichtung regelmäßig prüfen</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
