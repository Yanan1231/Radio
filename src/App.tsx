import { stations } from './data/stations'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { NowPlaying } from './components/NowPlaying'
import { StationCard } from './components/StationCard'
import { PlayerControls } from './components/PlayerControls'
import type { Station } from './types'

export default function App() {
  const { currentStation, status, volume, isMuted, play, stop, toggle, setVolume, toggleMute } = useAudioPlayer()

  const handleSelect = (station: Station) => toggle(station)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-amber-50">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-100 opacity-70" />
        <div className="absolute top-1/3 -left-12 w-40 h-40 rounded-full bg-sky-200 opacity-50" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full bg-blue-100 opacity-60" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-amber-100 opacity-70" />
        <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-sky-100 opacity-80" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center gap-3 mb-6 bg-white rounded-3xl px-5 py-4 border-2 border-blue-200 cartoon-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-2xl flex-shrink-0">
            📻
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-blue-900 leading-tight">Radio Station</h1>
            <p className="text-xs text-blue-400 font-semibold">internet radio, always on ✨</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1.5 border border-blue-200">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              status === 'playing' ? 'bg-green-400 animate-pulse' :
              status === 'loading' ? 'bg-amber-400 animate-pulse' :
              status === 'error'   ? 'bg-red-400' :
                                     'bg-blue-200'
            }`} />
            <span className="text-xs font-bold text-blue-600 capitalize">
              {status === 'idle' ? 'Ready' : status}
            </span>
          </div>
        </header>

        {/* Now Playing */}
        <div className="mb-5">
          <NowPlaying station={currentStation} status={status} />
        </div>

        {/* Player Controls */}
        <div className="mb-7">
          <PlayerControls
            station={currentStation}
            status={status}
            volume={volume}
            isMuted={isMuted}
            onStop={stop}
            onPlay={play}
            onVolumeChange={setVolume}
            onToggleMute={toggleMute}
          />
        </div>

        {/* Station List */}
        <div>
          <h2 className="text-sm font-extrabold text-blue-400 uppercase tracking-widest mb-3 px-1">
            ♪ Stations
          </h2>
          <div className="space-y-2.5">
            {stations.map(station => (
              <StationCard
                key={station.id}
                station={station}
                isActive={currentStation?.id === station.id}
                status={status}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="text-xs text-blue-300 font-semibold">
            Streaming via SomaFM · Free internet radio 🎶
          </p>
        </footer>
      </div>
    </div>
  )
}
