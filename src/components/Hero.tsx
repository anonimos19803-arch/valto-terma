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

        {/* CTA */}
        <a href="#tables" className="btn-primary text-base px-10 py-4">
          Κλείσε Τραπέζι
        </a>
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
