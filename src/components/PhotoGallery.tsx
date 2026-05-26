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
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-card ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setLightbox(`/uploads/${photo.filename}`)}
            >
              <Image
                src={`/uploads/${photo.filename}`}
                alt={`Event photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={i === 0 ? "50vw" : "25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-royal/90 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <Image src={lightbox} alt="Photo" width={1200} height={800} className="max-h-[90vh] w-auto object-contain rounded-lg" />
        </div>
      )}
    </>
  )
}
