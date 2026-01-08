import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Dose wählen",
      description: "Wähle aus unserer Kollektion deine Lieblingsdose – von kompakt bis geräumig, in verschiedenen Farben.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Design erstellen",
      description: "Lade dein Logo hoch oder gib deinen Text ein. Unser Editor zeigt dir live, wie deine Gravur aussieht.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Gravur erhalten",
      description: "Wir gravieren dein Design mit Präzision in Hamburg. In 2-4 Werktagen hältst du dein Unikat in Händen.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF9F7]">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-[#C9A962] mb-4">
            <span className="w-8 h-px bg-[#C9A962]"></span>
            Personalisierung
            <span className="w-8 h-px bg-[#C9A962]"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            So funktioniert's
          </h2>
          <p className="text-gray-600">
            In nur drei Schritten zu deiner personalisierten Premium Snus Dose
          </p>
        </div>

        {/* Steps Grid with Chevrons */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Step Card */}
              <div 
                className="flex-1 relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#C9A962]/20 transition-all duration-300 group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-[#C9A962] text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[#C9A962]/10 flex items-center justify-center text-[#C9A962] mb-6 group-hover:bg-[#C9A962] group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Chevron Connector (hidden on mobile, shown between items on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8 mx-2 text-[#C9A962] text-3xl font-light">
                  ›
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white font-medium rounded-lg hover:bg-[#B8944F] transition-colors"
          >
            Jetzt personalisieren
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
