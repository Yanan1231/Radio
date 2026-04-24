import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  baseOpacity: number
  phase: number
  speed: number
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

      stars = Array.from({ length: 220 }, () => ({
        x:           Math.random() * canvas.width,
        y:           Math.random() * canvas.height,
        r:           Math.random() * 1.3 + 0.15,
        baseOpacity: Math.random() * 0.65 + 0.2,
        phase:       Math.random() * Math.PI * 2,
        speed:       Math.random() * 0.6 + 0.15,
      }))
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      for (const s of stars) {
        const opacity = s.baseOpacity * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <>
      {/* Twinkling stars */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      />
      {/* Nebula colour clouds */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 55% at 15% 25%, rgba(88,28,135,0.50) 0%, transparent 55%),
            radial-gradient(ellipse 55% 65% at 85% 65%, rgba(30,64,175,0.40) 0%, transparent 52%),
            radial-gradient(ellipse 60% 45% at 50% 95%, rgba(109,40,217,0.30) 0%, transparent 50%),
            radial-gradient(ellipse 40% 38% at 68% 8%,  rgba(219,39,119,0.22) 0%, transparent 45%)
          `,
        }}
      />
    </>
  )
}
