import { useState, useCallback } from 'react'
import { stations } from './data/stations'
import { matchStationsByMood } from './utils/moodMatcher'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useNowPlaying } from './hooks/useNowPlaying'
import { GalaxyBackground } from './components/GalaxyBackground'
import { VinylRecord } from './components/VinylRecord'
import { Tonearm } from './components/Tonearm'
import { MoodInput } from './components/MoodInput'
import type { Station } from './types'

export default function App() {
  const { currentStation, status, volume, isMuted, play, stop, toggle, setVolume, toggleMute } =
    useAudioPlayer()
  const { trackInfo, albumArt } = useNowPlaying(currentStation)

  const [playlist, setPlaylist]       = useState<Station[]>(stations)
  const [stationIdx, setStationIdx]   = useState(0)
  const [activeMood, setActiveMood]   = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const isPlaying = status === 'playing'
  const isLoading = status === 'loading'
  const isError   = status === 'error'
  const display = currentStation ?? playlist[stationIdx]

  const navigate = (dir: 1 | -1) => {
    const next = ((stationIdx + dir) + playlist.length) % playlist.length
    setStationIdx(next)
    play(playlist[next])
  }

  const handlePlayPause = () => toggle(display)

  const handleMoodSearch = useCallback((mood: string) => {
    setIsSearching(true)
    setActiveMood(mood)
    setTimeout(() => {
      const results = matchStationsByMood(stations, mood)
      const list = results.length > 0 ? results : stations
      setPlaylist(list)
      setStationIdx(0)
      setIsSearching(false)
      play(list[0])
    }, 700)
  }, [play])

  const handleClearMood = () => {
    setActiveMood('')
    setPlaylist(stations)
    setStationIdx(0)
    stop()
  }

  return (
    <>
    <GalaxyBackground />
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-10 gap-8" style={{ position: 'relative', zIndex: 1 }}>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-white">Give Me Some Music</h1>
      </div>

      {/* Vinyl player */}
      <div style={{ position: 'relative', width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <VinylRecord
          isPlaying={isPlaying}
          albumArt={albumArt}
          accentColor={display.accentColor}
          emoji={display.emoji}
        />
        <Tonearm isPlaying={isPlaying} />
      </div>

      {/* Track / station info */}
      <div className="text-center space-y-1 min-h-[52px]">
        {isError ? (
          <p className="text-sm text-red-400/80">Stream unavailable — try another station</p>
        ) : trackInfo ? (
          <>
            <p className="text-base font-bold text-white leading-tight">{trackInfo.artist}</p>
            <p className="text-sm text-white/50 leading-tight">{trackInfo.title}</p>
          </>
        ) : (
          <p className="text-base font-bold text-white">{display.name}</p>
        )}
        <p className="text-xs text-white/30 uppercase tracking-widest">{display.genre}</p>
      </div>

      {/* Primary controls */}
      <div className="flex items-center gap-8">
        {/* Prev station */}
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          onClick={handlePlayPause}
          className="w-18 h-18 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{
            width: 72,
            height: 72,
            backgroundColor: display.accentColor,
            boxShadow: `0 0 30px ${display.accentColor}55`,
          }}
        >
          {isLoading ? (
            <div className="w-7 h-7 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : isPlaying ? (
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next station */}
        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8L8.5 12zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <button onClick={toggleMute} className="text-white/40 hover:text-white transition-colors flex-shrink-0">
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
          min={0} max={1} step={0.01}
          value={isMuted ? 0 : volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${display.accentColor} ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.12) ${(isMuted ? 0 : volume) * 100}%)`,
          }}
        />
      </div>

      {/* Mood input */}
      <div className="w-full max-w-xs">
        <MoodInput
          activeMood={activeMood}
          isSearching={isSearching}
          onSearch={handleMoodSearch}
          onClear={handleClearMood}
        />
      </div>

      {/* Footer */}
      <p className="text-xs text-white/15 tracking-wider">
        {activeMood
          ? `✨ ${playlist.length} stations matched "${activeMood}"`
          : `${display.emoji}  ${display.name}`}
      </p>

      {/* Copyright */}
      <p className="text-xs text-white/25 tracking-widest">© Yanan & Claude</p>

    </div>
    </>
  )
}
