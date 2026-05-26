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
    <section className="relative bg-brand-pink-bg">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-pink-light to-white" />

      <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
        {/* Logo */}
        <div className="animate-fade-in mb-10">
          <Image
            src="/logo.png"
            alt="ΒάΛτο Τέρμα"
            width={420}
            height={420}
            className="mx-auto w-64 md:w-80 h-auto"
            priority
          />
        </div>

        {/* Description */}
        <p className="animate-slide-up text-base md:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto mb-10">
          {description}
        </p>

        {/* Event details */}
        <div className="animate-slide-up flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 text-sm text-gray-600">
          {date && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>{date}</span>
            </div>
          )}
          <span className="text-gray-300 hidden sm:inline">|</span>
          {time && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{time}</span>
            </div>
          )}
          <span className="text-gray-300 hidden sm:inline">|</span>
          {location && (
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{location}</span>
            </div>
          )}
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="font-semibold text-brand-red">23+</span>
        </div>

        {/* CTA */}
        <a href="#tables" className="btn-primary">
          Κράτηση Τραπεζιού
        </a>
      </div>
    </section>
  )
}
