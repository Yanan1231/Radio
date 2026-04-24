import { useState } from 'react'
import { MOOD_SUGGESTIONS } from '../utils/moodMatcher'

interface Props {
  activeMood: string
  isSearching: boolean
  onSearch: (mood: string) => void
  onClear: () => void
}

export function MoodInput({ activeMood, isSearching, onSearch, onClear }: Props) {
  const [value, setValue] = useState('')

  const submit = (override?: string) => {
    const mood = (override ?? value).trim()
    if (!mood) return
    onSearch(mood)
    setValue('')
  }

  return (
    <div className="w-full space-y-3">
      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder={activeMood ? `"${activeMood}"  ← active` : 'Type a mood… chill, rainy, party…'}
          className="flex-1 bg-white/8 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
        />
        {activeMood ? (
          <button
            onClick={onClear}
            className="px-4 rounded-2xl border border-white/15 bg-white/8 text-white/50 hover:bg-white/15 hover:text-white transition-colors text-sm font-bold"
          >
            ✕
          </button>
        ) : (
          <button
            onClick={() => submit()}
            disabled={!value.trim() || isSearching}
            className="px-4 rounded-2xl border border-white/20 bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors disabled:opacity-30"
          >
            {isSearching ? '…' : '✨'}
          </button>
        )}
      </div>

      {/* Mood pills — horizontally scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {MOOD_SUGGESTIONS.map(({ label, value: v }) => (
          <button
            key={v}
            onClick={() => submit(v)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
              activeMood === v
                ? 'bg-white text-gray-900 border-white font-bold'
                : 'bg-white/8 text-white/50 border-white/15 hover:bg-white/18 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
