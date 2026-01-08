"use client"

import { useActionState } from "react"
import { sendContactForm, ContactFormState } from "@lib/actions/contact"

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    sendContactForm,
    null
  )

  return (
    <div>
      <h2 
        className="text-xl font-semibold mb-6"
        style={{ color: '#1A1A1A' }}
      >
        Schreib uns eine Nachricht
      </h2>
      
      {state && (
        <div 
          className={`mb-6 p-4 rounded-lg ${state.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
        >
          <p className={`text-sm ${state.success ? 'text-green-800' : 'text-red-800'}`}>
            {state.message}
          </p>
        </div>
      )}

      {(!state?.success) && (
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#1A1A1A' }}
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isPending}
                className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all disabled:opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                placeholder="Dein Name"
              />
            </div>
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#1A1A1A' }}
              >
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isPending}
                className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all disabled:opacity-50"
                style={{ borderColor: '#E5E7EB' }}
                placeholder="deine@email.de"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="subject" 
              className="block text-sm font-medium mb-2"
              style={{ color: '#1A1A1A' }}
            >
              Betreff
            </label>
            <select
              id="subject"
              name="subject"
              disabled={isPending}
              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all disabled:opacity-50"
              style={{ borderColor: '#E5E7EB' }}
            >
              <option value="">Bitte wählen...</option>
              <option value="order">Frage zu meiner Bestellung</option>
              <option value="product">Produktfrage</option>
              <option value="personalization">Frage zur Personalisierung</option>
              <option value="shipping">Versand & Lieferung</option>
              <option value="return">Rückgabe & Umtausch</option>
              <option value="business">Geschäftsanfrage</option>
              <option value="other">Sonstiges</option>
            </select>
          </div>

          <div>
            <label 
              htmlFor="order_number" 
              className="block text-sm font-medium mb-2"
              style={{ color: '#1A1A1A' }}
            >
              Bestellnummer (falls vorhanden)
            </label>
            <input
              type="text"
              id="order_number"
              name="order_number"
              disabled={isPending}
              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all disabled:opacity-50"
              style={{ borderColor: '#E5E7EB' }}
              placeholder="z.B. WEL-12345"
            />
          </div>

          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium mb-2"
              style={{ color: '#1A1A1A' }}
            >
              Nachricht *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={isPending}
              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#C9A962] transition-all resize-none disabled:opacity-50"
              style={{ borderColor: '#E5E7EB' }}
              placeholder="Wie können wir dir helfen?"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 px-8 font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
          >
            {isPending ? "Wird gesendet..." : "Nachricht senden"}
          </button>

          <p className="text-sm text-center" style={{ color: '#9CA3AF' }}>
            Wir antworten in der Regel innerhalb von 24 Stunden.
          </p>
        </form>
      )}

      {state?.success && (
        <div className="text-center py-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          >
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p style={{ color: '#6B7280' }}>
            Möchtest du eine weitere Nachricht senden?{" "}
            <button 
              onClick={() => window.location.reload()}
              className="underline"
              style={{ color: '#C9A962' }}
            >
              Formular zurücksetzen
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
