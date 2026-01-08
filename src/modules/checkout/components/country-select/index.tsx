import { HttpTypes } from "@medusajs/types"
import { ChangeEvent } from "react"

type CountrySelectProps = {
  name: string
  region?: HttpTypes.StoreRegion
  defaultValue?: string
  value?: string
  autoComplete?: string
  required?: boolean
  onChange?: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  "data-testid"?: string
}

const CountrySelect = ({ 
  name, 
  region, 
  defaultValue = "de",
  value,
  autoComplete,
  required = true,
  onChange,
  "data-testid": dataTestId,
}: CountrySelectProps) => {
  const countries = region?.countries || []
  
  // Fallback wenn keine Länder in der Region
  const defaultCountries = [
    { iso_2: "de", display_name: "Deutschland" },
    { iso_2: "at", display_name: "Österreich" },
    { iso_2: "ch", display_name: "Schweiz" },
  ]
  
  const availableCountries = countries.length > 0 ? countries : defaultCountries

  return (
    <select
      name={name}
      defaultValue={value ? undefined : defaultValue}
      value={value}
      autoComplete={autoComplete}
      required={required}
      onChange={onChange}
      data-testid={dataTestId}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A962] focus:border-transparent outline-none transition-all bg-white"
    >
      {availableCountries.map((country) => (
        <option key={country.iso_2} value={country.iso_2}>
          {country.display_name}
        </option>
      ))}
    </select>
  )
}

export default CountrySelect
