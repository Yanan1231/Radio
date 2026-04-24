import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  baseOpacity: number; phase: number; speed: number
  warm: boolean   // warm (orange/yellow) vs cold (white/blue)
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const W = canvas.width, H = canvas.height

      stars = Array.from({ length: 320 }, () => {
        // Bias star density toward the centre horizontal band (galactic plane)
        const inBand = Math.random() < 0.55
        const x = Math.random() * W
        const y = inBand
          ? H * 0.3 + Math.random() * H * 0.4
          : Math.random() * H
        return {
          x, y,
          r:           Math.random() * 1.4 + 0.15,
          baseOpacity: Math.random() * 0.7 + 0.2,
          phase:       Math.random() * Math.PI * 2,
          speed:       Math.random() * 0.5 + 0.15,
          warm:        Math.random() < 0.18,   // ~18 % warm/orange stars
        }
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.007

      for (const s of stars) {
        const opacity = s.baseOpacity * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.warm
          ? `rgba(255,210,140,${opacity})`   // warm orange/gold
          : `rgba(255,255,255,${opacity})`   // cold white/blue-white
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])

  return (
    <>
      {/* Twinkling star canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />

      {/*
        Layered CSS nebula — matched to the attached Milky Way galactic-centre photo:
        • Bright white core offset slightly right of centre
        • Wide crimson/red galactic-plane band
        • Rose-red upper/lower nebula clouds
        • Dark navy in the far corners
      */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 14% 7%  at 56% 50%, rgba(255,245,230,0.92) 0%, rgba(255,200,170,0.55) 40%, transparent 100%),
            radial-gradient(ellipse 40% 14% at 52% 50%, rgba(230,100,80,0.55)  0%, rgba(180,35,35,0.35)  60%, transparent 100%),
            radial-gradient(ellipse 95% 28% at 50% 50%, rgba(160,25,25,0.72)   0%, rgba(120,15,15,0.50)  50%, transparent 78%),
            radial-gradient(ellipse 70% 42% at 28% 38%, rgba(150,22,28,0.55)   0%, transparent 60%),
            radial-gradient(ellipse 55% 38% at 78% 32%, rgba(140,18,26,0.48)   0%, transparent 58%),
            radial-gradient(ellipse 62% 38% at 35% 68%, rgba(145,20,28,0.50)   0%, transparent 58%),
            radial-gradient(ellipse 48% 32% at 75% 72%, rgba(130,18,22,0.42)   0%, transparent 55%),
            radial-gradient(ellipse 30% 30% at 5%  10%, rgba(10,15,50,0.80)    0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 95% 10%, rgba(10,15,50,0.75)    0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 5%  90%, rgba(10,15,50,0.75)    0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 95% 90%, rgba(10,15,50,0.80)    0%, transparent 70%),
            #020208
          `,
        }}
      />
    </>
  )
}
