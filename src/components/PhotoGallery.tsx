"use client"

import { useState } from "react"
import Image from "next/image"

interface Photo {
  id: number
  filename: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (photos.length === 0) return null

  const displayPhotos = photos.slice(0, 5)

  return (
    <>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-blue mb-2">
            Στιγμιότυπα
          </h2>
          <p className="text-sm text-gray-400">
            Από τα events μας
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group border border-gray-100 shadow-sm ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setLightbox(`/uploads/${photo.filename}`)}
            >
              <Image
                src={`/uploads/${photo.filename}`}
                alt={`Event photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={i === 0 ? "50vw" : "25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={lightbox}
            alt="Photo"
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  )
}
