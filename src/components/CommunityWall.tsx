"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface CommunityPhoto {
  id: number
  imageData: string
  name: string
  createdAt: string
}

export default function CommunityWall() {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([])
  const [uploading, setUploading] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [name, setName] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch("/api/community-photos")
      const data = await res.json()
      setPhotos(data.photos || [])
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { fetchPhotos() }, [fetchPhotos])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError("")

    if (!file.type.startsWith("image/")) {
      setError("Μόνο εικόνες (JPG, PNG)")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Μέγιστο μέγεθος: 10MB")
      return
    }

    const img = new Image()
    const reader = new FileReader()
    reader.onload = (ev) => {
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const maxW = 1200
        const maxH = 1200
        let w = img.width
        let h = img.height

        if (w > maxW || h > maxH) {
          const ratio = Math.min(maxW / w, maxH / h)
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
        }

        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, w, h)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8)
        setPreview(dataUrl)
      }
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  async function handleUpload() {
    if (!preview) return
    setUploading(true)
    setError("")

    try {
      const res = await fetch("/api/community-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: preview, name }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Κάτι πήγε στραβά")
        return
      }

      setSuccess(true)
      setPreview(null)
      setName("")
      if (fileRef.current) fileRef.current.value = ""
      fetchPhotos()
      setTimeout(() => {
        setSuccess(false)
        setShowUpload(false)
      }, 2000)
    } catch {
      setError("Αποτυχία σύνδεσης")
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            Photo Wall
          </h2>
          <p className="text-sm text-white/40 mb-5">
            Ανέβασε τις φωτογραφίες σου από το event!
          </p>

          {/* Upload trigger */}
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 hover:text-white hover:bg-white/15 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            {showUpload ? "Κλείσιμο" : "Ανέβασε Φωτογραφία"}
          </button>
        </div>

        {/* Upload form */}
        {showUpload && (
          <div className="card p-6 mb-8 animate-fade-in">
            {success ? (
              <div className="text-center py-4">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-emerald-400 font-medium">Η φωτογραφία ανέβηκε!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File select */}
                {!preview ? (
                  <label className="block border-2 border-dashed border-white/15 rounded-xl p-8 text-center cursor-pointer hover:border-brand-pink/30 hover:bg-white/5 transition-all duration-200">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <svg className="w-10 h-10 mx-auto mb-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <p className="text-sm text-white/40">Πάτα ή σύρε μια φωτογραφία</p>
                    <p className="text-xs text-white/20 mt-1">JPG, PNG — μέχρι 10MB</p>
                  </label>
                ) : (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-xl bg-black/20" />
                    <button
                      onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = "" }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Name (optional) */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Το όνομά σου (προαιρετικό)"
                  className="input-field"
                  maxLength={50}
                />

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                {/* Submit */}
                <button
                  onClick={handleUpload}
                  disabled={!preview || uploading}
                  className="btn-primary w-full"
                >
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Ανέβασμα...
                    </span>
                  ) : "Δημοσίευση"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group rounded-xl overflow-hidden border border-white/10 cursor-pointer aspect-square"
                onClick={() => setLightbox(photo.imageData)}
              >
                <img
                  src={photo.imageData}
                  alt={photo.name || "Community photo"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                {photo.name && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-xs text-white/80 truncate">{photo.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {photos.length === 0 && !showUpload && (
          <div className="text-center py-6">
            <p className="text-white/20 text-sm">Δεν υπάρχουν φωτογραφίες ακόμα — γίνε ο πρώτος!</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox}
            alt="Photo"
            className="max-h-[85vh] max-w-full object-contain rounded-lg"
          />
        </div>
      )}
    </>
  )
}
