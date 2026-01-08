import { Metadata } from "next"
import PaymentCallback from "@modules/checkout/components/payment-callback"
import { retrieveCart } from "@lib/data/cart"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Zahlung wird verarbeitet...",
  description: "Ihre Zahlung wird verarbeitet.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function PaymentCallbackPage({ params }: Props) {
  const { countryCode } = await params
  const cart = await retrieveCart()

  if (!cart) {
    redirect(`/${countryCode}`)
  }

  return <PaymentCallback cart={cart} countryCode={countryCode} />
}
