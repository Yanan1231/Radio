import type { Station, PlayerStatus } from '../types'
import { Visualizer } from './Visualizer'

interface Props {
  station: Station | null
  status: PlayerStatus
}

export function NowPlaying({ station, status }: Props) {
  const isPlaying = status === 'playing'
  const isLoading = status === 'loading'
  const isError = status === 'error'

  if (!station) {
    return (
      <div className="bg-white rounded-3xl border-2 border-blue-200 cartoon-shadow p-8 text-center">
        <div className="text-6xl mb-3 animate-pulse-slow">📻</div>
        <p className="text-blue-400 font-bold text-sm">Pick a station below to start listening!</p>
        <p className="text-blue-200 font-semibold text-xs mt-1">8 stations ready for you 🎵</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-200 cartoon-shadow overflow-hidden">
      {/* Gradient header strip */}
      <div className={`bg-gradient-to-br ${station.color} px-6 pt-6 pb-5`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Status badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 mb-3 border border-white/80">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: isError ? '#EF4444' : isPlaying ? '#22C55E' : '#F59E0B' }}
              />
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                {isLoading ? 'Connecting…' : isError ? 'Error' : isPlaying ? 'Live' : 'Paused'}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-blue-900 leading-tight truncate">{station.name}</h2>
            <p className="text-sm font-bold text-blue-500 mt-0.5">{station.genre}</p>
          </div>

          <div
            className="w-16 h-16 rounded-2xl border-2 border-white/60 flex items-center justify-center text-3xl ml-4 flex-shrink-0"
            style={{ backgroundColor: station.accentColor + '30' }}
          >
            {station.emoji}
          </div>
        </div>
      </div>

      {/* Bottom white section */}
      <div className="px-6 py-4">
        <p className="text-blue-600 text-sm font-semibold italic leading-relaxed mb-4">
          "{station.tagline}"
        </p>

        <div className="flex items-center gap-3">
          <Visualizer isPlaying={isPlaying} color={station.accentColor} />
          {isPlaying && (
            <span className="text-xs font-bold text-blue-400">Streaming live</span>
          )}
        </div>
      </div>
    </div>
  )
}
