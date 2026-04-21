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
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📻</div>
        <p className="text-white/40 text-sm">Select a station to start listening</p>
      </div>
    )
  }

  return (
    <div className={`rounded-3xl p-6 bg-gradient-to-br ${station.color} border border-white/10`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2 h-2 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: isError ? '#ef4444' : station.accentColor }}
            />
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              {isLoading ? 'Connecting...' : isError ? 'Error' : isPlaying ? 'Live' : 'Paused'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">{station.name}</h2>
          <p className="text-sm text-white/60 mt-1">{station.genre}</p>
        </div>
        <div className="text-4xl">{station.emoji}</div>
      </div>

      <p className="text-white/70 text-sm italic mb-5 leading-relaxed">
        "{station.tagline}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Visualizer isPlaying={isPlaying} color={station.accentColor} />
          {isPlaying && (
            <span className="text-xs text-white/50">Streaming live</span>
          )}
        </div>
      </div>
    </div>
  )
}
