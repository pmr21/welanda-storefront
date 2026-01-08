const TrustSection = () => {
  const testimonials = [
    {
      name: "Thomas M.",
      location: "München",
      rating: 5,
      text: "Endlich eine Dose, die meinen Ansprüchen gerecht wird. Die Gravur meines Firmenlogos ist perfekt geworden!",
      product: "WELANDA Grip"
    },
    {
      name: "Sarah K.",
      location: "Hamburg",
      rating: 5,
      text: "Als Geschenk für meinen Freund gekauft – er war begeistert! Die Qualität ist wirklich premium.",
      product: "WELANDA Classic"
    },
    {
      name: "Michael R.",
      location: "Berlin",
      rating: 5,
      text: "Schnelle Lieferung, top Qualität. Das 2-Kammer-System ist super praktisch für unterwegs.",
      product: "WELANDA Puck S"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-[#C9A962] mb-4">
            <span className="w-8 h-px bg-[#C9A962]"></span>
            Kundenstimmen
            <span className="w-8 h-px bg-[#C9A962]"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-gray-600">
            Über 500 zufriedene Kunden vertrauen auf WELANDA
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#FAF9F7] rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-[#C9A962]/20">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-[#0A0A0A]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <span className="text-xs font-medium text-[#C9A962] bg-[#C9A962]/10 px-3 py-1 rounded-full">
                  {testimonial.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A962]">500+</div>
              <div className="text-sm text-gray-600">Zufriedene Kunden</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A962]">4.9/5</div>
              <div className="text-sm text-gray-600">Durchschnittliche Bewertung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A962]">2-4</div>
              <div className="text-sm text-gray-600">Tage Lieferzeit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A962]">100%</div>
              <div className="text-sm text-gray-600">Personalisiert in Hamburg</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
