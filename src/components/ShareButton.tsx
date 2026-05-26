"use client"

import { useState } from "react"

export default function ShareButton() {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = typeof window !== "undefined" ? window.location.href : ""
  const text = "Κλείσε τραπέζι για το Βάλ' το Τέρμα! 🇬🇷🎶"

  function handleCopy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank")
    setShowMenu(false)
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({ title: "Βάλ' το Τέρμα", text, url })
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Share menu */}
      {showMenu && (
        <div className="absolute bottom-16 right-0 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-3 mb-2 min-w-[200px] shadow-xl animate-fade-in">
          <button
            onClick={shareWhatsApp}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/80 hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-emerald-400">Link αντιγράφτηκε!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.81" />
                </svg>
                Αντιγραφή link
              </>
            )}
          </button>

          {/* Close area */}
          <div className="fixed inset-0 -z-10" onClick={() => setShowMenu(false)} />
        </div>
      )}

      {/* Main share button */}
      <button
        onClick={shareNative}
        className="w-14 h-14 rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/30 flex items-center justify-center hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Μοιράσου το event"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>
    </div>
  )
}
