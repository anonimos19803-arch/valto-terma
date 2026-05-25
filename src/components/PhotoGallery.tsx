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

  if (photos.length === 0) {
    return (
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[400px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`bg-surface ${
                i === 0 ? "col-span-2 row-span-2" : ""
              } flex items-center justify-center`}
            >
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const displayPhotos = photos.slice(0, 5)

  return (
    <>
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden cursor-pointer group ${
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
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <Image
            src={lightbox}
            alt="Photo"
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto object-contain"
          />
        </div>
      )}
    </>
  )
}
