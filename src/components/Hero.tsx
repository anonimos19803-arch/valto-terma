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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden bg-pink-bg">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-pink-300/30 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/40 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cherry rounded-full animate-float opacity-50" />
      <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-royal rounded-full animate-float opacity-40" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 animate-fade-in max-w-2xl">
        {/* Logo image */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="ΒάΛτο Τέρμα"
            width={500}
            height={500}
            className="mx-auto w-72 md:w-96 h-auto drop-shadow-lg"
            priority
          />
        </div>

        <p className="text-lg md:text-xl text-royal/70 max-w-xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {date && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-cherry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{date}</span>
            </div>
          )}
          {time && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-royal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{time}</span>
            </div>
          )}
          {location && (
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-cherry-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">{location}</span>
            </div>
          )}
          <div className="bg-cherry text-white px-4 py-2 rounded-full text-sm font-bold">
            23+
          </div>
        </div>

        <a href="#booking" className="btn-primary text-sm tracking-widest uppercase">
          Κάνε Κράτηση
        </a>
      </div>
    </section>
  )
}
