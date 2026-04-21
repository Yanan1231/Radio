import type { Station, PlayerStatus } from '../types'
import { Visualizer } from './Visualizer'

interface Props {
  station: Station
  isActive: boolean
  status: PlayerStatus
  onSelect: (station: Station) => void
}

export function StationCard({ station, isActive, status, onSelect }: Props) {
  const isPlaying = isActive && status === 'playing'
  const isLoading = isActive && status === 'loading'

  return (
    <button
      onClick={() => onSelect(station)}
      className={`
        w-full text-left p-4 rounded-2xl border transition-all duration-300 group
        ${isActive
          ? 'border-white/20 bg-white/10 shadow-lg scale-[1.02]'
          : 'border-white/5 bg-white/5 hover:bg-white/8 hover:border-white/10 hover:scale-[1.01]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: station.accentColor + '25' }}
        >
          {station.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm truncate">{station.name}</span>
            {isActive && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: station.accentColor + '30', color: station.accentColor }}
              >
                {isLoading ? 'LOADING' : 'LIVE'}
              </span>
            )}
          </div>
          <p className="text-white/50 text-xs mt-0.5 truncate">{station.genre}</p>
        </div>

        <div className="flex-shrink-0">
          {isLoading ? (
            <div
              className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: station.accentColor, borderTopColor: 'transparent' }}
            />
          ) : isPlaying ? (
            <Visualizer isPlaying color={station.accentColor} />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
