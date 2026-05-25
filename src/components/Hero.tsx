"use client"

interface HeroProps {
  title: string
  description: string
  date: string
  time: string
  location: string
}

export default function Hero({ title, description, date, time, location }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-10 right-10 w-2 h-2 bg-accent rounded-full animate-float opacity-60" />
      <div className="absolute top-32 left-20 w-1.5 h-1.5 bg-gold rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-xs tracking-[0.25em] uppercase text-muted">Live Event</span>
        </div>

        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
          <span className="text-gradient">{title}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {date && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{date}</span>
            </div>
          )}
          {time && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{time}</span>
            </div>
          )}
          {location && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{location}</span>
            </div>
          )}
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-accent">23+</span>
          </div>
        </div>

        <a href="#booking" className="btn-primary text-sm tracking-widest uppercase">
          Κάνε Κράτηση
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
