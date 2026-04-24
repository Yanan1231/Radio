interface Props {
  isPlaying: boolean
  albumArt: string | null
  accentColor: string
  emoji: string
}

export function VinylRecord({ isPlaying, albumArt, accentColor, emoji }: Props) {
  return (
    <div
      className={isPlaying ? 'vinyl-spin' : ''}
      style={{
        width: 280,
        height: 280,
        borderRadius: '50%',
        position: 'relative',
        flexShrink: 0,
        background: `
          repeating-radial-gradient(
            circle at 50%,
            #111 0px, #111 1px,
            #1c1c1c 1px, #1c1c1c 2px,
            #141414 2px, #141414 4px
          )
        `,
        boxShadow: `
          0 0 0 2px #2a2a2a,
          0 8px 40px rgba(0,0,0,0.9),
          0 0 60px ${accentColor}18
        `,
      }}
    >
      {/* Vinyl sheen — conic highlight that spins with the record */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'conic-gradient(transparent 0%, rgba(255,255,255,0.03) 15%, transparent 30%, rgba(255,255,255,0.015) 50%, transparent 65%, rgba(255,255,255,0.02) 80%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Center label */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 108,
          height: 108,
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 3px rgba(0,0,0,0.4)',
        }}
      >
        {albumArt ? (
          <img
            src={albumArt}
            alt="album art"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: 38, lineHeight: 1 }}>{emoji}</span>
        )}
      </div>

      {/* Spindle hole */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#0a0a0f',
          zIndex: 2,
        }}
      />
    </div>
  )
}
