interface Props {
  isPlaying: boolean
}

export function Tonearm({ isPlaying }: Props) {
  return (
    // Positioned at the top-right corner of the record container
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 70,
        height: 180,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="70"
        height="180"
        viewBox="-10 0 80 180"
        overflow="visible"
        style={{ filter: 'drop-shadow(1px 3px 6px rgba(0,0,0,0.7))' }}
      >
        <defs>
          <linearGradient id="armG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#555" />
            <stop offset="40%"  stopColor="#c8c8c8" />
            <stop offset="60%"  stopColor="#a0a0a0" />
            <stop offset="100%" stopColor="#555" />
          </linearGradient>
        </defs>

        {/* Arm group — rotates around the pivot */}
        <g
          style={{
            transformOrigin: '35px 18px',
            transform: isPlaying ? 'rotate(0deg)' : 'rotate(-32deg)',
            transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Main arm body */}
          <line
            x1="35" y1="18"
            x2="2"  y2="158"
            stroke="url(#armG)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Headshell elbow */}
          <line
            x1="2"  y1="158"
            x2="-8" y2="170"
            stroke="#999"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Stylus dot */}
          <circle cx="-8" cy="170" r="4.5" fill="#f0b429" />
        </g>

        {/* Static pivot hardware */}
        <circle cx="35" cy="18" r="13" fill="#2e2e2e" stroke="#555" strokeWidth="1.5" />
        <circle cx="35" cy="18" r="6"  fill="#111" />
        <circle cx="35" cy="18" r="2"  fill="#888" />
      </svg>
    </div>
  )
}
