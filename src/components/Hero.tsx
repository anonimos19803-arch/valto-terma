"use client"

import Image from "next/image"

interface HeroProps {
  title: string
  description: string
  date: string
  time: string
  location: string
}

export default function Hero({ title, description, date, time, location }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Pink radial glow behind logo — blends the logo's pink background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-pink/25 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
        {/* Logo — blended with background */}
        <div className="animate-fade-in mb-8">
          <Image
            src="/logo.png"
            alt="Βάλ' το Τέρμα"
            width={420}
            height={420}
            className="mx-auto w-52 md:w-72 h-auto rounded-3xl"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </div>

        {/* Tagline */}
        <div className="animate-slide-up mb-8 space-y-3">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-pink">
            Greek vibes only 🇬🇷
          </p>
          <p className="text-base md:text-lg text-white/70 max-w-md mx-auto leading-relaxed">
            Βάλ' το Τέρμα — music that brings people together
          </p>
        </div>

        {/* Event details pill */}
        <div className="animate-slide-up mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full px-5 py-3 border border-white/15">
            {date && (
              <div className="flex items-center gap-1.5 text-sm text-white/90">
                <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span>{date}</span>
              </div>
            )}
            <span className="text-white/20 hidden sm:inline">|</span>
            {time && (
              <div className="flex items-center gap-1.5 text-sm text-white/90">
                <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{time}</span>
              </div>
            )}
            <span className="text-white/20 hidden sm:inline">|</span>
            {location && (
              <div className="flex items-center gap-1.5 text-sm text-white/90">
                <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{location}</span>
              </div>
            )}
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="font-bold text-brand-red text-sm">23+</span>
          </div>
        </div>

        {/* CTA + Social */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#tables" className="btn-primary text-base px-10 py-4">
            Κλείσε Τραπέζι
          </a>
          <a
            href="https://instagram.com/valtoterma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:bg-white/15 px-5 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @valtoterma
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8">
        <a href="#tables" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
