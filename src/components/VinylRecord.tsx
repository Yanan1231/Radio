interface Props {
  isPlaying: boolean
  albumArt: string | null
  accentColor: string
  emoji: string
}

export function VinylRecord({ isPlaying, albumArt, accentColor, emoji }: Props) {
  return (
    // Gold ring — static, never spins
    <div
      style={{
        width: 292,
        height: 292,
        borderRadius: '50%',
        padding: 5,
        background: `conic-gradient(
          #5C3D00 0deg,
          #B8860B 30deg,
          #FFD700 60deg,
          #FFF5A0 90deg,
          #FFD700 120deg,
          #DAA520 150deg,
          #B8860B 180deg,
          #5C3D00 210deg,
          #B8860B 240deg,
          #FFD700 270deg,
          #FFF5A0 300deg,
          #FFD700 330deg,
          #5C3D00 360deg
        )`,
        boxShadow: `
          0 0 18px rgba(255,215,0,0.55),
          0 0 50px rgba(255,215,0,0.20),
          0 10px 50px rgba(0,0,0,0.85)
        `,
        flexShrink: 0,
      }}
    >
      {/* Vinyl disc — this part spins */}
      <div
        className={isPlaying ? 'vinyl-spin' : ''}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          position: 'relative',
          background: `
            repeating-radial-gradient(
              circle at 50%,
              #111 0px, #111 1px,
              #1c1c1c 1px, #1c1c1c 2px,
              #141414 2px, #141414 4px
            )
          `,
        }}
      >
        {/* Iridescent sheen */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
            background:
              'conic-gradient(transparent 0%, rgba(255,255,255,0.03) 15%, transparent 30%, rgba(255,255,255,0.015) 50%, transparent 65%, rgba(255,255,255,0.02) 80%, transparent 100%)',
          }}
        />

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 108, height: 108,
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: accentColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 3px rgba(0,0,0,0.5)',
          }}
        >
          {albumArt ? (
            <img src={albumArt} alt="album art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 38, lineHeight: 1 }}>{emoji}</span>
          )}
        </div>

        {/* Spindle hole */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 10, height: 10,
            borderRadius: '50%',
            backgroundColor: '#0a0a0f',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  )
}
