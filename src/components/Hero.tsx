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
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="animate-fade-in">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
          Event
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-wide text-gray-500">
          {date && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span>{date}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-primary rounded-full" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span>23+</span>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <a
          href="#booking"
          className="btn-primary text-sm tracking-widest uppercase"
        >
          Κράτηση
        </a>
      </div>
    </section>
  )
}
