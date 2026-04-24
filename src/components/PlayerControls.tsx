import type { Station, PlayerStatus } from '../types'

interface Props {
  station: Station | null
  status: PlayerStatus
  volume: number
  isMuted: boolean
  onStop: () => void
  onPlay: (station: Station) => void
  onVolumeChange: (v: number) => void
  onToggleMute: () => void
}

export function PlayerControls({
  station,
  status,
  volume,
  isMuted,
  onStop,
  onPlay,
  onVolumeChange,
  onToggleMute,
}: Props) {
  const isPlaying = status === 'playing'
  const isLoading = status === 'loading'
  const canToggle = !!station

  const handlePlayPause = () => {
    if (!station) return
    isPlaying ? onStop() : onPlay(station)
  }

  const displayVolume = isMuted ? 0 : volume
  const accentColor = station?.accentColor ?? '#3B82F6'

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-200 cartoon-shadow px-5 py-4 flex items-center gap-4">
      {/* Play / Pause button */}
      <button
        onClick={handlePlayPause}
        disabled={!canToggle}
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-150 flex-shrink-0 border-2 disabled:opacity-30 disabled:cursor-not-allowed cartoon-shadow-btn"
        style={{
          backgroundColor: accentColor,
          borderColor: accentColor,
        }}
      >
        {isLoading ? (
          <div className="w-6 h-6 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Volume */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={onToggleMute}
          className="text-blue-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          {isMuted || volume === 0 ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : volume < 0.5 ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={displayVolume}
          onChange={e => onVolumeChange(parseFloat(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} ${displayVolume * 100}%, #BFDBFE ${displayVolume * 100}%)`,
          }}
        />

        <span className="text-xs font-bold text-blue-400 w-8 text-right flex-shrink-0">
          {Math.round(displayVolume * 100)}
        </span>
      </div>
    </div>
  )
}
