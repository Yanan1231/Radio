import { useState, useRef, useEffect } from 'react'
import type { Source } from '../types'

interface Props {
  sources: Source[]
  selectedId: string
  onChange: (id: string) => void
}

export function SourceDropdown({ sources, selectedId, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = sources.find(s => s.id === selectedId) ?? sources[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (id: string) => {
    onChange(id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 bg-white transition-all duration-150
          ${open ? 'border-blue-400 cartoon-shadow-active' : 'border-blue-200 cartoon-shadow-sm hover:border-blue-300'}
        `}
      >
        <span className="text-2xl">{selected.emoji}</span>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-extrabold text-blue-900 truncate">{selected.name}</p>
          <p className="text-xs font-semibold text-blue-400 truncate">{selected.description}</p>
        </div>
        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 right-0 bg-white border-2 border-blue-200 rounded-2xl cartoon-shadow overflow-hidden">
          {sources.map((source, i) => {
            const isSelected = source.id === selectedId
            return (
              <button
                key={source.id}
                onClick={() => handleSelect(source.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100
                  ${isSelected ? 'bg-blue-50' : 'hover:bg-blue-50/60'}
                  ${i < sources.length - 1 ? 'border-b border-blue-100' : ''}
                `}
              >
                <span className="text-2xl">{source.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-blue-900 truncate">{source.name}</p>
                  <p className="text-xs font-semibold text-blue-400 truncate">{source.description}</p>
                </div>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
