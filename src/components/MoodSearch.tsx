import { useState, useRef } from 'react'
import { MOOD_SUGGESTIONS } from '../utils/moodMatcher'

interface Props {
  activeMood: string
  isSearching: boolean
  onSearch: (mood: string) => void
  onClear: () => void
}

export function MoodSearch({ activeMood, isSearching, onSearch, onClear }: Props) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (value?: string) => {
    const mood = (value ?? input).trim()
    if (!mood) return
    onSearch(mood)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const handlePill = (value: string) => {
    onSearch(value)
    setInput('')
    inputRef.current?.blur()
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-200 cartoon-shadow p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>
        <h2 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider">Mood Playlist</h2>
        {activeMood && (
          <button
            onClick={onClear}
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Input row */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">🎭</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a mood… happy, rainy, coffee, space…"
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-blue-200 bg-blue-50 text-blue-900 text-sm font-semibold placeholder:text-blue-300 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          disabled={!input.trim() || isSearching}
          className="px-4 py-2.5 rounded-2xl border-2 border-blue-600 bg-blue-600 text-white text-sm font-extrabold transition-all disabled:opacity-40 disabled:cursor-not-allowed cartoon-shadow-btn whitespace-nowrap"
        >
          {isSearching ? '✨…' : '✨ Go!'}
        </button>
      </div>

      {/* Mood pill shortcuts */}
      <div className="flex flex-wrap gap-2">
        {MOOD_SUGGESTIONS.map(({ label, value }) => {
          const isActive = activeMood === value
          return (
            <button
              key={value}
              onClick={() => handlePill(value)}
              className={`
                text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all duration-150
                ${isActive
                  ? 'bg-blue-500 border-blue-600 text-white cartoon-shadow-sm'
                  : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300'
                }
              `}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Active mood banner */}
      {activeMood && !isSearching && (
        <div className="mt-4 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2.5">
          <span className="text-base">🎶</span>
          <p className="text-sm font-bold text-blue-700">
            Playlist for <span className="italic">"{activeMood}"</span>
          </p>
        </div>
      )}

      {/* Searching state */}
      {isSearching && (
        <div className="mt-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
          <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
          <p className="text-sm font-bold text-blue-500">Finding the perfect stations for you…</p>
        </div>
      )}
    </div>
  )
}
