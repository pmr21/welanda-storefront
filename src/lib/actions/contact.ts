"use server"

import nodemailer from "nodemailer"

export type ContactFormState = {
  success: boolean
  message: string
} | null

type ContactFormData = {
  name: string
  email: string
  subject: string
  orderNumber: string
  message: string
}

export async function sendContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data: ContactFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    orderNumber: formData.get("order_number") as string,
    message: formData.get("message") as string,
  }

  // Validierung
  if (!data.name || !data.email || !data.message) {
    return {
      success: false,
      message: "Bitte fülle alle Pflichtfelder aus.",
    }
  }

  // E-Mail-Validierung
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: "Bitte gib eine gültige E-Mail-Adresse ein.",
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const subjectMap: Record<string, string> = {
      order: "Frage zu Bestellung",
      product: "Produktfrage",
      personalization: "Personalisierung",
      shipping: "Versand & Lieferung",
      return: "Rückgabe & Umtausch",
      business: "Geschäftsanfrage",
      other: "Sonstiges",
    }

    const subjectText = data.subject ? subjectMap[data.subject] || data.subject : "Kontaktanfrage"

    const emailContent = `
Neue Kontaktanfrage von welanda.com

Name: ${data.name}
E-Mail: ${data.email}
Betreff: ${subjectText}
${data.orderNumber ? `Bestellnummer: ${data.orderNumber}` : ""}

Nachricht:
${data.message}
    `.trim()

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL || "contact@welanda.com",
      replyTo: data.email,
      subject: `[WELANDA Kontakt] ${subjectText} - ${data.name}`,
      text: emailContent,
    })

    return {
      success: true,
      message: "Vielen Dank für deine Nachricht! Wir melden uns schnellstmöglich bei dir.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
    }
  }
}
