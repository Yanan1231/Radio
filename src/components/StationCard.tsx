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
        w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group
        ${isActive
          ? 'bg-blue-50 border-blue-400 cartoon-shadow-active scale-[1.02]'
          : 'bg-white border-blue-200 cartoon-shadow-sm hover:border-blue-300 hover:scale-[1.01] hover:bg-blue-50/50'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Emoji bubble */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border-2 transition-transform duration-200 group-hover:scale-110 ${
            isActive ? 'border-blue-300' : 'border-blue-100'
          }`}
          style={{ backgroundColor: station.accentColor + '20' }}
        >
          {station.emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-blue-900 text-sm truncate">{station.name}</span>
            {isActive && (
              <span
                className="text-[10px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 border"
                style={{
                  backgroundColor: station.accentColor + '20',
                  color: station.accentColor,
                  borderColor: station.accentColor + '40',
                }}
              >
                {isLoading ? 'LOADING…' : '● LIVE'}
              </span>
            )}
          </div>
          <p className="text-blue-400 text-xs font-semibold mt-0.5 truncate">{station.genre}</p>
        </div>

        {/* Right side indicator */}
        <div className="flex-shrink-0">
          {isLoading ? (
            <div
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: station.accentColor, borderTopColor: 'transparent' }}
            />
          ) : isPlaying ? (
            <Visualizer isPlaying color={station.accentColor} />
          ) : (
            <div
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110"
              style={{ backgroundColor: station.accentColor + '15', borderColor: station.accentColor + '40' }}
            >
              <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: station.accentColor }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
