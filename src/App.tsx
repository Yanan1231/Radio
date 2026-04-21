import { stations } from './data/stations'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { NowPlaying } from './components/NowPlaying'
import { StationCard } from './components/StationCard'
import { PlayerControls } from './components/PlayerControls'
import type { Station } from './types'

export default function App() {
  const { currentStation, status, volume, isMuted, play, stop, toggle, setVolume, toggleMute } = useAudioPlayer()

  const handleSelect = (station: Station) => {
    toggle(station)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: currentStation?.accentColor ?? '#8b5cf6' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: currentStation?.accentColor ?? '#6366f1' }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Radio Station</h1>
            <p className="text-xs text-white/40">Internet radio, always on</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'playing' ? 'bg-green-400 animate-pulse' : status === 'loading' ? 'bg-yellow-400 animate-pulse' : status === 'error' ? 'bg-red-400' : 'bg-gray-600'}`} />
            <span className="text-xs text-white/40 capitalize">{status === 'idle' ? 'Ready' : status}</span>
          </div>
        </header>

        {/* Now Playing */}
        <div className="mb-6">
          <NowPlaying station={currentStation} status={status} />
        </div>

        {/* Player Controls */}
        <div className="mb-8">
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
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 px-1">
            Stations
          </h2>
          <div className="space-y-2">
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
          <p className="text-xs text-white/20">
            Streaming via{' '}
            <span className="text-white/30">SomaFM</span>
            {' '}· Free internet radio
          </p>
        </footer>
      </div>
    </div>
  )
}
