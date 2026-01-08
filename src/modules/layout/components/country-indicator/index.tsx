"use client"

import { useParams } from "next/navigation"
import ReactCountryFlag from "react-country-flag"

const CountryIndicator = () => {
  const { countryCode } = useParams()

  if (!countryCode) return null

  return (
    <div className="hidden small:flex items-center" title="Versand nach Deutschland">
      <ReactCountryFlag
        svg
        style={{
          width: "20px",
          height: "20px",
        }}
        countryCode={countryCode as string}
      />
    </div>
  )
}

export default CountryIndicator
