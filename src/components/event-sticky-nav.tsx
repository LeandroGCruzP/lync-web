'use client'

import { useEffect, useState } from 'react'

export function EventStickyNav() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'cronograma', 'lineup', 'register']
      const scrollThreshold = 160

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50

      if (isBottom) {
        setActiveSection('register')
        return
      }

      let currentSection = ''

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= scrollThreshold && rect.bottom > scrollThreshold) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="sticky top-0 z-40 border-y border-white/5 bg-zinc-950/80 py-4 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] justify-center gap-8 px-4 text-[10px] font-black tracking-[0.25em] uppercase md:gap-12 md:text-xs">
        {[
          { id: 'about', label: 'Sobre' },
          { id: 'cronograma', label: 'Cronograma' },
          { id: 'lineup', label: 'Atletas' },
          { id: 'register', label: 'Inscrição' },
        ].map((item) => {
          const isActive = activeSection === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 transition-colors duration-300 ${
                isActive
                  ? 'text-primary font-black'
                  : 'hover:text-primary text-white/60'
              }`}
            >
              {item.label}
              <span
                className={`bg-primary absolute bottom-[-4px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-300 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
