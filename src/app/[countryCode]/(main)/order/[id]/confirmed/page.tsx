import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your purchase was successful",
}

// Webhook an n8n senden
async function notifyOrderWebhook(order: any) {
  try {
    const webhookData = {
      id: order.id,
      display_id: order.display_id,
      email: order.email,
      shipping_address: order.shipping_address,
      items: order.items?.map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        metadata: item.metadata,
      })),
    }

    await fetch("https://n8n.ranasinghe.de/webhook/welanda-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    })
    
    console.log("[WELANDA] Order webhook sent for:", order.display_id)
  } catch (error) {
    console.error("[WELANDA] Webhook error:", error)
  }
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  // n8n Webhook aufrufen (async, blockiert nicht die Seite)
  notifyOrderWebhook(order)

  return <OrderCompletedTemplate order={order} />
}
